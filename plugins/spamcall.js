let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '*Masukkan nomor tujuan dengan awalan 62xx*', m)
  if(isNaN(text)) return m.reply(`*Nomor hanya berupa angka dengan awalan 62xx*`)
  let res = await fetch(global.API('xteam', '/spammer/allspam', { no: text }, 'APIKEY'))
  let json = await res.json()
  if (json.code == 200) m.reply(`*Sukses mengirim spam ke nomor ${text}*`)
  else m.reply(`*Gagal mengirim spam ke nomor ${text}*`)
}
handler.help = ['allspam *62xx*']
handler.tags = ['tools','premium']
handler.command = /^(allspam)$/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = false
handler.limit = true

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler