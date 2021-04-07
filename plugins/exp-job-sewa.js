let handler = async (m, { conn, text, participants }) => {

  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }

  function getRandom(min,max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random()*(max-min+1)) + min
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

  user = text.split('@')[1] + "@s.whatsapp.net"

  if (!text){
    return conn.reply(m.chat,'*[ JOB ERROR ]*\n\nTag nama orang yang ingin anda sewa jasanya.',m)
  }else if(global.DATABASE.data.users[text] == "undefined"){
    return conn.reply(m.chat,'*[ JOB ERROR ]*\n\nOrang yang anda tag tidak menawarkan jasa apapun.',m)
  }else {


    if (m.sender == user){
      return conn.reply(m.chat,'*[ JOB ERROR ]*\n\nTidak bisa menyewa diri sendiri',m)
    }else if (global.DATABASE.data.users[m.sender].exp < global.DATABASE.data.users[user].price){
      return conn.reply(m.chat,`*[ JOB ERROR ]*\n\nUang anda miliki tidak cukup untuk membeli jasa dari @${user.split('@')[0]}\n\nSaldo anda : Rp. ${format(global.DATABASE.data.users[m.sender].exp)},-\nHarga jasa : Rp. ${format(global.DATABASE.data.users[user].price)},-`,m,{contextInfo: {
        mentionedJid: [user]
      }})
    }else {
      if (global.DATABASE.data.users[user].job === "x"){
        return conn.reply(m.chat,'*[ JOB ERROR ]*\n\nOrang yang anda tag tidak menawarkan jasa apapun.',m)  
      }else if (global.DATABASE.data.users[user].job === "lonte"){
        global.DATABASE.data.users[m.sender].exp -= global.DATABASE.data.users[user].price
        global.DATABASE.data.users[user].exp += global.DATABASE.data.users[user].price
        conn.reply(m.chat,`*[ JASA SEWA LONTE ]*\n\n@${m.sender.split('@')[0]} : "Aku masukin ya sayang ahhh"\n@${user.split('@')[0]} : "Aduuh pelan pelan dong, enaaak"\n@${m.sender.split('@')[0]} : "Aaaah aaaahhh, croooot"\n\nBiaya sewa : Rp. ${format(global.DATABASE.data.users[user].price)}`,m,{contextInfo: {
          mentionedJid: [m.sender,user]
        }})
        global.DATABASE.data.users[user].price = 0
        global.DATABASE.data.users[user].job = "x"
      }else if (global.DATABASE.data.users[user].job === "pijat"){
        global.DATABASE.data.users[m.sender].exp -= global.DATABASE.data.users[user].price
        global.DATABASE.data.users[user].exp += global.DATABASE.data.users[user].price
        conn.reply(m.chat,`*[ JASA SEWA TUKANG PIJAT ]*\n\n@${m.sender.split('@')[0]} : "Bagian sininya pijat yang enak ya bangsat"\n@${user.split('@')[0]} : "Iya suhu, sabar, ini lagi di pijat, huft"\n@${m.sender.split('@')[0]} : "Aaaah aaaahhh jangan ke alat vital dooong"\n\nBiaya sewa : Rp. ${format(global.DATABASE.data.users[user].price)}`,m,{contextInfo: {
          mentionedJid: [m.sender,user]
        }})
        global.DATABASE.data.users[user].price = 0
        global.DATABASE.data.users[user].job = "x"
      }else if (global.DATABASE.data.users[user].job === "sepong"){
        global.DATABASE.data.users[m.sender].exp -= global.DATABASE.data.users[user].price
        global.DATABASE.data.users[user].exp += global.DATABASE.data.users[user].price
        conn.reply(m.chat,`*[ JASA TUKANG SEPONG ]*\n\n@${m.sender.split('@')[0]} : "Ayok aku buka dulu celananya"\n@${user.split('@')[0]} : "Waduh gede kali om, mmppsss"\n@${m.sender.split('@')[0]} : "Croooot, telen ayo telen"\n\nBiaya sewa : Rp. ${format(global.DATABASE.data.users[user].price)}`,m,{contextInfo: {
          mentionedJid: [m.sender,user]
        }})
        global.DATABASE.data.users[user].price = 0
        global.DATABASE.data.users[user].job = "x"
      }else if (global.DATABASE.data.users[user].job === "maling"){
        let users = participants.map(u => u.jid)
		    var tag = users[Math.floor(users.length * Math.random())]
        limitMax = getRandom(1,Math.floor(global.DATABASE.data.users[user].price/100000)*2)
        if (global.DATABASE.data.users[tag].limit < limitMax){
          limitMax = global.DATABASE.data.users[tag].limit
        }
        global.DATABASE.data.users[tag].limit -= limitMax
        global.DATABASE.data.users[m.sender].limit += limitMax
        global.DATABASE.data.users[m.sender].exp -= global.DATABASE.data.users[user].price
        global.DATABASE.data.users[user].exp += global.DATABASE.data.users[user].price
        conn.reply(m.chat,`*[ JASA SEWA MALING ]*\n\n@${user.split('@')[0]} : "Woy bangsat sini gw maling limit lu !"\n@${tag.split('@')[0]} : "Ampuuuun ndan, hiks hiks"\n\n_5 Menit kemudian_\n\n@${user.split('@')[0]} : "Ni bos hasil maling limitnya si @${tag.split('@')[0]} cuma dapet ${limitMax} limit"\n@${m.sender.split('@')[0]} : "Oke siap njing"\n\nBiaya sewa : Rp. ${format(global.DATABASE.data.users[user].price)}`,m,{contextInfo: {
          mentionedJid: [m.sender,user,tag]
        }})
        global.DATABASE.data.users[user].price = 0
        global.DATABASE.data.users[user].job = "x"
      }
    }
  }

}
handler.help = ['sewa *@user*']
handler.tags = ['fun','game']
handler.command = /^sewa$/i
handler.admin = false
handler.group = true
handler.botAdmin = false
handler.limit = true
module.exports = handler