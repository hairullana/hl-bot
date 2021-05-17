let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args, usedPrefix, command }) => {
	
	if(!args || !args[0]) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*[ WRONG FORMAT ]*\n\nExample :\n	○ ${usedPrefix + command} on\n	○ ${usedPrefix + command} off`, m)
	} else if(args[0] == 'on') {
		let cek = global.DATABASE._data.chats[m.chat].warningGroup
	  if(cek) return conn.reply(m.chat, `*Anti Badword sudah di aktifkan*`, m)
		await conn.updatePresence(m.chat, Presence.composing) 
		global.DATABASE._data.chats[m.chat].warningGroup = true
		conn.reply(m.chat, `*[ BADWORD FILTER ACTIVATED ]*\n\nHarap menjaga cara bicara :)`, m)
	} else if(args[0] == 'off') {
		let cek = global.DATABASE._data.chats[m.chat].warningGroup
	  if(!cek) return conn.reply(m.chat, `*Anti Badword sudah di nonaktifkan*`, m)
		await conn.updatePresence(m.chat, Presence.composing) 
		global.DATABASE._data.chats[m.chat].warningGroup = false
		conn.reply(m.chat, `*[ BADWORD FILTER DEACTIVATED ]*\n\nSilahkan badword sesuka hati anda`, m)
	} else {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*[ WRONG FORMAT ]*\n\contoh :\n	○ ${usedPrefix + command} on\n	○ ${usedPrefix + command} off`, m)
	} 
}
handler.help = ['antibadword *on/off*']
handler.tags = ['group admin']
handler.command = /^(antibadword)$/i
handler.owner = false
handler.admin = true
handler.botAdmin = true
handler.group = true
handler.exp = 0
handler.limit = false
module.exports = handler