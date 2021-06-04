let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	let text = args.join` `
	await conn.updatePresence(m.chat, Presence.composing)
	fetch('https://videfikri.com/api/anime/randomquoteanime')
		.then(res => res.json())
		.then(batch => {
			conn.updatePresence(m.chat, Presence.composing) 
			conn.reply(m.chat, `*❏  A N I M E  Q U O T E S*\n\n*Anime :* ${batch.result.anime}\n*Character :* ${batch.result.character}\n*Quotes :* ${batch.result.quotes}`, m)   
	}) .catch(() => { conn.reply(m.chat, global.error, m) })
}
handler.help = ['quotesanime']
handler.tags = ['text']
handler.command = /^(quotesanime)$/i
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