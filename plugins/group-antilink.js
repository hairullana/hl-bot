let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args, usedPrefix, command }) => {
	
	if(!args || !args[0]) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Format salah! Contoh :*\n\n	*○ ${usedPrefix + command} on*\n	*○ ${usedPrefix + command} off*`, m)
	} else if(args[0] == 'on') {
		let cek = global.DATABASE._data.chats[m.chat].nolink
	if(cek) return conn.reply(m.chat, `*Anti Link telah aktif pada grup ini.*\n*Share Link GC = Kick !!!*`, m)
		await conn.updatePresence(m.chat, Presence.composing) 
		global.DATABASE._data.chats[m.chat].nolink = true
		conn.reply(m.chat, `*Anti Link berhasil diaktifkan.*\n*Share Link GC = Kick !!!*`, m)
	} else if(args[0] == 'off') {
		let cek = global.DATABASE._data.chats[m.chat].nolink

	if(!cek) return conn.reply(m.chat, `*Anti Link telah di nonaktifkan pada grup ini.*`, m)
		await conn.updatePresence(m.chat, Presence.composing) 
		global.DATABASE._data.chats[m.chat].nolink = false
		conn.reply(m.chat, `*Anti Link berhasil di nonaktifkan.*`, m)
	} else {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Format salah! Contoh :*\n\n	*○ ${usedPrefix + command} on*\n	*○ ${usedPrefix + command} off*`, m)
	} 
}
handler.help = ['antilink on/off']
handler.tags = ['group']
handler.command = /^(antilink)$/i
handler.owner = false
handler.admin = true
handler.botAdmin = true
handler.exp = 0
handler.limit = false
module.exports = handler