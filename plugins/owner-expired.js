let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
  if (!text){
    return conn.reply(m.chat,"*❏ EXPIRED GROUP*\n\nMasukkan angka mewakili jumlah hari !\nMisal : .expired 30")
  }else if (isNaN(text)){
    if (text == "forever"){
      global.DATABASE.data.chats[m.chat].expired = 0
      return conn.reply(m.chat,`*❏ EXPIRED GROUP*\n\nBerhasil menetapkan _expired day_ untuk *${conn.getName(m.chat)}* untuk selamanya.*`) 
    }
    return conn.reply(m.chat,"*❏ EXPIRED GROUP*\n\nMasukkan hanya angka mewakili jumlah hari !\nMisal : .expired 30")
  }

  var jumlahHari = 86400000 * text
  // var jumlahHari = 1000 * text
  var now = new Date() * 1
  global.DATABASE.data.chats[m.chat].expired = now + jumlahHari
  conn.reply(m.chat,`*❏ EXPIRED GROUP*\n\nBerhasil menetapkan _expired day_ untuk *${conn.getName(m.chat)}* selama *${text} hari*.`) 

}
handler.help = ['expired *days*']
handler.tags = ['owner']
handler.command = /^(expired)$/i
handler.owner = true
handler.group = true
handler.fail = null
module.exports = handler