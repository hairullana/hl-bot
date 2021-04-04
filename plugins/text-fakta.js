let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	await conn.updatePresence(m.chat, Presence.composing)
	fetch('https://videfikri.com/api/fakta/')
		.then(res => res.json())
		.then(json => {
			conn.reply(m.chat, json.result.fakta,m)
	})
}
handler.help = ['fakta']
handler.tags = ['text']
handler.command = /^(fakta)$/i
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