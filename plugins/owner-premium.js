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
  if (now < global.DATABASE.data.users[hl[0]].premiumDate) global.DATABASE.data.users[hl[0]].premiumDate += jumlahHari
  else global.DATABASE.data.users[hl[0]].premiumDate = now + jumlahHari
  conn.reply(m.chat,`*❏ UPGRADE PREMIUM*\n\nBerhasil menambahkan akses premium kepada *@${hl[0].split('@')[0]}* selama *${hl[1]} hari*.\n\n*Premium : ${msToDate(global.DATABASE.data.users[hl[0]].premiumDate - now)}*`,m,{ contextInfo: { mentionedJid: [hl[0]] } })
  conn.reply(hl[0],`*❏ UPGRADE PREMIUM*\n\nBerhasil menambahkan akses premium kepada *@${hl[0].split('@')[0]}* selama *${hl[1]} hari*.\n\n*Premium : ${msToDate(global.DATABASE.data.users[hl[0]].premiumDate - now)}*`,m,{ contextInfo: { mentionedJid: [hl[0]] } }) 

}
handler.help = ['prem *@tag,days*']
handler.tags = ['owner']
handler.command = /^(prem)$/i
handler.owner = true
handler.fail = null
module.exports = handler

function msToDate(ms) {
  temp = ms
  days = Math.floor(ms / (24*60*60*1000));
  daysms = ms % (24*60*60*1000);
  hours = Math.floor((daysms)/(60*60*1000));
  hoursms = ms % (60*60*1000);
  minutes = Math.floor((hoursms)/(60*1000));
  minutesms = ms % (60*1000);
  sec = Math.floor((minutesms)/(1000));
  return days+"H "+hours+"J "+ minutes + "M";
  // +minutes+":"+sec;
}