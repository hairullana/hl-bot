let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
  if (!text || isNaN(text)) return conn.reply(m.chat,"*Masukkan angka mewakili jumlah hari !*\n*Misal : .expired 30*")

  var jumlahHari = 86400000 * text
  var now = new Date() * 1
  if (now < global.DATABASE.data.chats[m.chat].expired) global.DATABASE.data.chats[m.chat].expired += jumlahHari
  else global.DATABASE.data.chats[m.chat].expired = now + jumlahHari
  conn.reply(m.chat,`*❏ EXPIRED GROUP*\n\nBerhasil menetapkan _expired day_ untuk *${conn.getGroup(m.chat)}* selama *${text} hari*.\n\nTotal Expired : ${msToDate(global.DATABASE.data.chats[m.chat].expired - now)}`)

}
handler.help = ['expired *days*']
handler.tags = ['owner']
handler.command = /^(expired)$/i
handler.owner = true
handler.group = true
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