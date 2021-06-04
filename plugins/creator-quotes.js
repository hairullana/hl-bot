let fetch = require('node-fetch')
let handler = async (m, { conn, text,  }) => {

  if (!text) throw '*Masukkan inputan yang benar ! Contoh :*\n*.quotemaker Kamu Anjing|HL Gans*'

  var text1 = text.split('|')[0]
  var text2 = text.split('|')[1]

  let img = global.API('xteam', '/quotemaker', {
    text: text1,
    wm: text2
  }, 'APIKEY')
  
  m.reply(global.wait)
  conn.sendFile(m.chat, img, 'img.jpg', null, m)
}
handler.help = ['quotemaker'].map(v => v + ' _text|text_')
handler.tags = ['creator']
handler.limit = true
handler.exp = 5000
handler.command = /^(quotemaker|quotesmaker)$/i
module.exports = handler