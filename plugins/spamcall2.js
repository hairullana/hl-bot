let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, text, usedPrefix, command }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	if(!text || isNaN(text)) return conn.reply(m.chat, `*[ SPAM CALL ERROR ]*\n\nContoh : ${usedPrefix + command} 88214686029`, m)
	fetch('https://videfikri.com/api/call/?nohp=' + text)
    	.then(res => res.json())
    	.then(call => {
		if(call.result.status !== "200") return conn.reply(m.chat, `*[ SPAM CALL ERROR ]*\n\nGagal untuk melakukan panggilan.`, m) 
		conn.reply(m.chat, `Berhasil mengirim panggilan ke nomor 0${text}`, m) 
	}) .catch(() => { conn.reply(m.chat, `Limit 3x / Nomor.`, m) })
}
handler.help = ['spamcall2 *8xx* (prem)']
handler.tags = ['premium','tools']
handler.command = /^(spamcall2)$/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
// handler.private = true
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = true
handler.exp = 0
module.exports = handler