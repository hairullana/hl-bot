let fetch = require('node-fetch')
let handler = async (m, { conn, text, command }) => {

  if (!text) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} HL Gans*`

  var text1 = text.split('|')[0]
  var text2 = text.split('|')[1]

  let img = global.API('xteam', '/textpro/wolflogoblackwhite', {
    text: text1,
    text2: text2
  }, 'APIKEY')
  
  conn.reply(m.chat,'*Tunggu sebenar . . .*',m)
  conn.sendFile(m.chat, img, 'img.jpg', null, m)
}
handler.help = ['wolf'].map(v => v + ' *text|text*')
handler.tags = ['logo']
handler.limit = true
handler.exp = 5000
handler.command = /^(wolf)$/i
module.exports = handler