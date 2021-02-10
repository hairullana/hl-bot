let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	if (!args || !args[0]) return conn.reply(m.chat, `⺀ Format salah!\n\n*Contoh* : _${usedPrefix + command} tokyo ghoul_`, m)
	let text = args.join` `
	await conn.updatePresence(m.chat, Presence.composing) 
	conn.reply(m.chat, `*Sedang mencari data . . .*`, m)
	fetch('http://api.arugaz.my.id/api/media/ytsearch?query=' + encodeURIComponent(text))
    	.then(res => res.json())
    	.then(batch => {
    		if(batch.status !== 200) {
    			conn.reply(m.chat, `*Data tidak ditemukan!*`, m)   
    		} else {
    			conn.updatePresence(m.chat, Presence.composing) 
    			conn.reply(m.chat,`*⺀ YOUTUBE ⺀*\n\n${batch.result}\n\n▌│█║▌║▌║║▌║▌║█│▌▌│`, m)   
    	}
	}) .catch(() => { conn.reply(m.chat, `_Error!_`, m) })
}
handler.help = ['yt'].map(v => v + ' <query> (OFF)')
handler.tags = ['data']
// handler.command = /^(yt)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = true
handler.exp = 250
module.exports = handler