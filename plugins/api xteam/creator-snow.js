let fetch = require('node-fetch')
let handler = async (m, { conn, text, command }) => {

  if (!text) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} HL Gans*`

  let img = global.API('xteam', '/textpro/snowtext', {
    text: text
  }, 'APIKEY')
  
  m.reply(global.wait)
  conn.sendFile(m.chat, img, 'img.jpg', null, m)
}
handler.help = ['snow'].map(v => v + ' _text_')
handler.tags = ['creator']
handler.limit = true
handler.exp = 5000
handler.command = /^(snow)$/i
module.exports = handler