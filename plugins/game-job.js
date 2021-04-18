let handler = async (m, { conn, args }) => {

  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }

  // jika belum terdaftar
  if(typeof global.DATABASE.data.users[m.sender] == 'undefined') {
  global.DATABASE._data.users[m.sender] = {
			exp: 0,
			limit: 10,
			lastclaim: 0,
			warning: 0,
			job: "no",
      price: 0,
			chat: 0,
			whitelist: false,
			isBanned: false,
			spam: 0
		}
	}

  var ket = "\n\nKetik *.sewa @user* untuk menggunakan jasa"

  if (!args[0] || !args[1]){
    return conn.reply(m.chat,'*[ JOB ERROR ]*\n\nMasukkan nama profesinya dan harga jasa. Misal :\n.job maling 100000\n\nPekerjaan yang tersedia : pijat, lonte, sepong',m)
  }else {
    if (parseInt(args[1]) < 100000 || parseInt(args[1]) > 100000000){
      return conn.reply(m.chat,'*[ JOB ERROR ]*\n\nHarga jasa minimal Rp. 100.000,- dan maksimal Rp. 100.000.000,-',m)
    }
    args[0] = args[0].toLowerCase()
    if (args[0] === "lonte"){
      global.DATABASE.data.users[m.sender].job = args[0]
      global.DATABASE.data.users[m.sender].price = parseInt(args[1])
      conn.reply(m.chat,`*[ JASA SEWA LONTE ]*\n\n@${m.sender.split('@')[0]} menawarkan diri sebagai lonte dengan biaya ${format(args[1])},-${ket}`,m, {contextInfo: {
        mentionedJid: [m.sender]
      }})
    }else if (args[0] === "pijat"){
      global.DATABASE.data.users[m.sender].job = args[0]
      global.DATABASE.data.users[m.sender].price = parseInt(args[1])
      conn.reply(m.chat,`*[ JASA TUKANG PIJAT ]*\n\n@${m.sender.split('@')[0]} menawarkan diri sebagai tukang pijat dengan biaya ${format(args[1])},-${ket}`,m, {contextInfo: {
        mentionedJid: [m.sender]
      }})
    }else if (args[0] === "sepong"){
      global.DATABASE.data.users[m.sender].job = args[0]
      global.DATABASE.data.users[m.sender].price = parseInt(args[1])
      conn.reply(m.chat,`*[ JASA TUKANG SEPONG ]*\n\n@${m.sender.split('@')[0]} menawarkan diri sebagai tukang sepong dengan biaya ${format(args[1])},-${ket}`,m, {contextInfo: {
        mentionedJid: [m.sender]
      }})
    }else if (args[0] === "maling"){
      global.DATABASE.data.users[m.sender].job = args[0]
      global.DATABASE.data.users[m.sender].price = parseInt(args[1])
      conn.reply(m.chat,`*[ JASA TUKANG MALING ]*\n\n@${m.sender.split('@')[0]} menawarkan diri sebagai tukang maling dengan biaya ${format(args[1])},-${ket}`,m, {contextInfo: {
        mentionedJid: [m.sender]
      }})
    }else {
      conn.reply(m.chat,'*[ JOB ERROR ]*\n\nJenis pekerjaan yang tersedia adalah maling, lonte, sepong, pijat',m)
    }
  }

}
handler.help = ['job','jasa'].map(v => v + ' *service* *price*')
handler.tags = ['fun','game']
handler.command = /^job|jasa$/i
handler.admin = false
handler.group = true
handler.botAdmin = false
handler.limit = true
module.exports = handler