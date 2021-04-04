let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	let text = args.join` `
	await conn.updatePresence(m.chat, Presence.composing)
	fetch('https://videfikri.com/api/kbbi/?query=')
		.then(res => res.json())
		.then(batch => {
			conn.updatePresence(m.chat, Presence.composing) 
			conn.reply(m.chat, `*[ KBBI ]*\n\n*Anime :* ${batch.result.anime}\n*Character :* ${batch.result.character}\n*Quotes :* ${batch.result.quotes}`, m)   
	}) .catch(() => { conn.reply(m.chat, `*[ FITUR ERROR ]*\n\nMaaf fitur ${command} sedang tidak bisa digunakan.`, m) })
}
handler.help = ['kbbi *query*']
handler.tags = ['text']
handler.command = /^(kbbi)$/i
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