let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	if (!args || !args[0]) return conn.reply(m.chat, `⺀ Format salah!\n\n*Contoh* : _${usedPrefix + command} tokyo ghoul_`, m)
	let text = args.join` `
	await conn.updatePresence(m.chat, Presence.composing) 
	m.reply(global.wait)
	fetch('https://videfikri.com/api/chord/?query=' + encodeURIComponent(text))
		.then(res => res.json())
		.then(batch => {
			conn.updatePresence(m.chat, Presence.composing) 
			conn.reply(m.chat, `*❏  C H O R D  L A G U*\n\n${batch.result.title}\n${batch.result.chord}`, m)   
	}) .catch(() => { m.reply(global.error) })
}
handler.help = ['chord'].map(v => v + ' _query_')
handler.tags = ['data']
handler.command = /^(chord)$/i
handler.fail = null
handler.limit = true
module.exports = handler