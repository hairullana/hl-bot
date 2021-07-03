let fetch = require('node-fetch')
let handler = async (m, { conn, text, command  }) => {

  if (!text) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM|Bot*`
  var text1 = text.split('|')[0]
  var text2 = text.split('|')[1]
  if (!text2) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM|Bot*`
  if (text1.length > 15 || text2.length > 15) throw `*Masukkan maksimal 15 karakter*`

  let img = global.API('xteam', '/textpro/marvel', {
    text: text1,
    text2: text2
  }, 'APIKEY')
  
  m.reply(global.wait)
  conn.sendFile(m.chat, img, 'img.jpg', null, m)
}
handler.help = ['marvel2'].map(v => v + ' *text|text*')
handler.tags = ['creator']
handler.limit = true
handler.exp = 5000
handler.command = /^(marvel2)$/i
module.exports = handler