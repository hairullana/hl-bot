let fetch = require('node-fetch')
let handler = async (m, { conn }) => {

  let img = global.API('xteam', '/asupan/darkjoke', {} ,'APIKEY')
  
  // conn.reply(m.chat,'*Tunggu sebenar . . .*',m)
  // conn.reply(m.chat, img, m)
  conn.sendFile(m.chat, img, 'img.jpg', null, m)
}
handler.help = ['darkjoke']
handler.tags = ['random']
handler.limit = true
handler.exp = 5000
handler.command = /^(darkjoke)$/i
module.exports = handler