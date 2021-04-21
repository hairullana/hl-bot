let fetch = require('node-fetch')
let handler = async (m, { conn, text,  }) => {

  if (!text) throw '*Masukkan inputan yang benar ! Contoh :*\n*.tahta HL Gans*'

  let img = global.API('xteam', '/tahta', {
    text: text
  }, 'APIKEY')
  
  conn.reply(m.chat,'*Tunggu sebenar . . .*',m)
  conn.sendFile(m.chat, img, 'img.jpg', null, m)
}
handler.help = ['tahta'].map(v => v + ' *text*')
handler.tags = ['creator']
handler.limit = true
handler.exp = 5000
handler.command = /^(tahta)$/i
module.exports = handler