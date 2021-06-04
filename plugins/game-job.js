let handler = async (m, { conn, args }) => {
  var ket = "\n\nKetik *.sewa @user* untuk menggunakan jasa"

  if (!args[0] || !args[1]){
    return conn.reply(m.chat,'Masukkan nama profesinya dan harga jasa. Misal :\n.job maling 100000\n\nPekerjaan yang tersedia : pijat, lonte, sepong',m)
  }else {
    if (parseInt(args[1]) < 100000 || parseInt(args[1]) > 100000000){
      return conn.reply(m.chat,'Harga jasa minimal Rp. 100.000,- dan maksimal Rp. 100.000.000,-',m)
    }
    args[0] = args[0].toLowerCase()
    if (args[0] === "lonte"){
      global.DATABASE.data.users[m.sender].job = args[0]
      global.DATABASE.data.users[m.sender].price = parseInt(args[1])
      conn.reply(m.chat,`*❏  J A S A  L O N T E*\n\n@${m.sender.split('@')[0]} menawarkan diri sebagai lonte dengan biaya ${args[1].toLocaleString()},-${ket}`,m, {contextInfo: {
        mentionedJid: [m.sender]
      }})
    }else if (args[0] === "pijat"){
      global.DATABASE.data.users[m.sender].job = args[0]
      global.DATABASE.data.users[m.sender].price = parseInt(args[1])
      conn.reply(m.chat,`*❏  J A S A  P I J A T*\n\n@${m.sender.split('@')[0]} menawarkan diri sebagai tukang pijat dengan biaya ${args[1].toLocaleString()},-${ket}`,m, {contextInfo: {
        mentionedJid: [m.sender]
      }})
    }else if (args[0] === "sepong"){
      global.DATABASE.data.users[m.sender].job = args[0]
      global.DATABASE.data.users[m.sender].price = parseInt(args[1])
      conn.reply(m.chat,`*❏  J A S A  S E P O N G*\n\n@${m.sender.split('@')[0]} menawarkan diri sebagai tukang sepong dengan biaya ${args[1].toLocaleString()},-${ket}`,m, {contextInfo: {
        mentionedJid: [m.sender]
      }})
    }else if (args[0] === "maling"){
      global.DATABASE.data.users[m.sender].job = args[0]
      global.DATABASE.data.users[m.sender].price = parseInt(args[1])
      conn.reply(m.chat,`*❏  J A S A  M A L I N G*\n\n@${m.sender.split('@')[0]} menawarkan diri sebagai tukang maling dengan biaya ${args[1].toLocaleString()},-${ket}`,m, {contextInfo: {
        mentionedJid: [m.sender]
      }})
    }else {
      conn.reply(m.chat,'Jenis pekerjaan yang tersedia adalah maling, lonte, sepong, pijat',m)
    }
  }

}
handler.help = ['job','jasa'].map(v => v + ' _service_ _price_')
handler.tags = ['fun','game']
handler.command = /^job|jasa$/i
handler.group = true
handler.limit = true
module.exports = handler