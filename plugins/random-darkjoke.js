let fetch = require('node-fetch')
let handler = async (m, { conn }) => {

  let img = global.API('xteam', '/asupan/darkjoke', {} ,'APIKEY')
  
  m.reply(global.wait)
  conn.sendFile(m.chat, img, 'img.jpg', null, m)
}
handler.help = ['darkjoke']
handler.tags = ['random']
handler.limit = true
handler.exp = 5000
handler.command = /^(darkjoke)$/i
module.exports = handler