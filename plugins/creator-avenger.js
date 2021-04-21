let fetch = require('node-fetch')
let handler = async (m, { conn, text, command  }) => {

  if (!text) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} HL|Gans*`

  var text1 = text.split('|')[0]
  var text2 = text.split('|')[1]

  let img = global.API('xteam', '/textpro/3davenger', {
    text: text1,
    text2: text2
  }, 'APIKEY')
  
  conn.reply(m.chat,'*Tunggu sebenar . . .*',m)
  conn.sendFile(m.chat, img, 'img.jpg', null, m)
}
handler.help = ['avenger'].map(v => v + ' *text|text*')
handler.tags = ['creator']
handler.limit = true
handler.exp = 5000
handler.command = /^(avenger)$/i
module.exports = handler