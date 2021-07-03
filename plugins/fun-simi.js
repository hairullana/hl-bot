let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `Format salah!\n\n*Contoh* : _${usedPrefix + command} apa kabar simi_`, m)
  conn.updatePresence(m.chat, Presence.composing)
	let res = await fetch(global.API('xteam', '/simsimi2', { kata: text }, 'APIKEY'))
  let json = await res.json()
  if (json.code == 200) conn.reply(m.chat,json.result, m)
  else m.reply(error)
}
handler.help = ['simi','s'].map(v => v + ' *text*')
handler.tags = ['fun']
handler.command = /^(simi|s)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = true
handler.exp = 750
module.exports = handler