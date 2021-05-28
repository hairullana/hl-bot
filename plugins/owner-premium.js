let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
  function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }

  var hl = []
  hl[0] = text.split(',')[0]
  hl[0] = no(hl[0]) + "@s.whatsapp.net"
  hl[1] = text.split(',')[1]

  var jumlahHari = 86400000 * hl[1]
  // var jumlahHari = 1000 * text
  var now = new Date() * 1
  global.DATABASE.data.users[hl[0]].premium = true
  global.DATABASE.data.users[hl[0]].premiumDate = now + jumlahHari
  conn.reply(m.chat,`*[ USER PREMIUM ]*\n\nBerhasil memberikan akses premium kepada *@${hl[0].split('@')[0]}* selama *${hl[1]} hari*.`,m,{ contextInfo: { mentionedJid: [hl[0]] } })
  conn.reply(hl[0],`*[ USER PREMIUM ]*\n\nBerhasil memberikan akses premium kepada *@${hl[0].split('@')[0]}* selama *${hl[1]} hari*.`,m,{ contextInfo: { mentionedJid: [hl[0]] } }) 

}
handler.help = ['prem *days*']
handler.tags = ['owner']
handler.command = /^(prem)$/i
handler.owner = true
handler.mods = false
handler.premium = false
// handler.group = true
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler