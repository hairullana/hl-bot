let fetch = require('node-fetch')
let handler = async (m, { conn, text, command }) => {

  if (!text) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} HL Gans*`

  let img = global.API('xteam', '/textpro/cloudtext', {
    text: text
  }, 'APIKEY')
  
  conn.reply(m.chat,'*Tunggu sebenar . . .*',m)
  conn.sendFile(m.chat, img, 'img.jpg', null, m)
}
handler.help = ['cloud'].map(v => v + ' *text*')
handler.tags = ['creator']
handler.limit = true
handler.exp = 5000
handler.command = /^(cloud)$/i
module.exports = handler