let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	if (!args || !args[0]) return conn.reply(m.chat, `⺀ Format salah!\n\n*Contoh* : _${usedPrefix + command} tokyo ghoul_`, m)
	let text = args.join` `
	await conn.updatePresence(m.chat, Presence.composing) 
	conn.reply(m.chat, `*Sedang mencari data . . .*`, m)
	fetch('https://videfikri.com/api/chord/?query=' + encodeURIComponent(text))
		.then(res => res.json())
		.then(batch => {
			conn.updatePresence(m.chat, Presence.composing) 
			conn.reply(m.chat, `*[ CHORD LAGU ]*\n\n${batch.result.title}\n${batch.result.chord}`, m)   
	}) .catch(() => { conn.reply(m.chat, `*[ FITUR ERROR ]*\n\nMaaf fitur ${command} sedang tidak bisa digunakan.`, m) })
}
handler.help = ['chord'].map(v => v + ' *query*')
handler.tags = ['fun','data']
handler.command = /^(chord)$/i
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