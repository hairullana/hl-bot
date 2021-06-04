let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) return conn.reply(m.chat, `*Format salah!*\n\n*Contoh* : _${usedPrefix + command} hairul lana_`, m)

	await conn.updatePresence(m.chat, Presence.composing) 
	conn.reply(m.chat, global.wait, m)

	let res = await fetch(global.API('xteam', '/primbon/artinama', {
    q: text
  }, 'APIKEY'))
  let json = await res.json()

	if (json.code == 200){
		conn.reply(m.chat, `*❏ ARTI NAMA*\n\n*Nama :* ${json.result.nama}\n*Arti :* ${json.result.arti}\n\n${json.result.maksud}`, m)
	}
}
handler.help = ['artinama'].map(v => v + ' _query_')
handler.tags = ['fun','data']
handler.command = /^(artinama)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = true
handler.exp = 500
module.exports = handler