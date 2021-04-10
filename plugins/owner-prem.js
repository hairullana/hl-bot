let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
  if(!m.quoted) return conn.reply(m.chat, `*[ USER PREMIUM ]*\n\nTag orang yang ingin di jadikan user premium !`, m)


  if (!text){
    return conn.reply(m.chat,"*[ USER PREMIUM ]*\n\nMasukkan angka mewakili jumlah hari !\nMisal : .premium 30")
  }else if (isNaN(text)){
    return conn.reply(m.chat,"*[ USER PREMIUM ]*\n\nMasukkan hanya angka mewakili jumlah hari !\nMisal : .premium 30")
  }
  // var jumlahHari = 86400000 * text
  var jumlahHari = 1000 * text
  var now = new Date() * 1
  global.DATABASE.data.users[m.quoted.sender].premium = true
  global.DATABASE.data.users[m.quoted.sender].premiumDate = now + jumlahHari
  conn.reply(m.chat,`*[ USER PREMIUM ]*\n\nBerhasil memberikan akses premium kepada *@${m.quoted.sender.split('@')[0]}* selama *${text} detik*.`,m,{ contextInfo: { mentionedJid: [m.quoted.sender] } }) 

}
handler.help = ['prem *days*']
handler.tags = ['owner']
handler.command = /^(prem)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler