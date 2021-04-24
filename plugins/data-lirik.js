let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	if (!args || !args[0]) return conn.reply(m.chat, `Format salah!\n\n*Contoh* : _${usedPrefix + command} pale pale_`, m)
	let text = args.join` `
	await conn.updatePresence(m.chat, Presence.composing) 
	conn.reply(m.chat, `*Sedang mencari data . . .*`, m)
	fetch('https://videfikri.com/api/liriklagu/?query=' + encodeURIComponent(text))
		.then(res => res.json())
		.then(batch => {
			if (batch.result.title == "") return conn.reply(m.chat, `*Lirik lagu tidak di temukan.*`, m)
			conn.updatePresence(m.chat, Presence.composing) 
			conn.reply(m.chat, `*[ LIRIK LAGU ]*\n\nJudul : ${batch.result.title}\nArtis : ${batch.result.artist}\n\n${batch.result.lirik}`, m)
	}) .catch(() => { conn.reply(m.chat, `*[ FITUR ERROR ]*\n\nMaaf fitur ${command} sedang tidak bisa digunakan.`, m) })
}
handler.help = ['lirik'].map(v => v + ' *query*')
handler.tags = ['fun','data']
handler.command = /^(lirik)$/i
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