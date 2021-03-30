let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	let list = Object.entries(global.DATABASE.data.users)
	
	list.slice(0, list.length).map(([user, data], i) => (Number(data.isBanned = false)))
	var temp = global.DATABASE.data.banned
	global.DATABASE.data.banned = 0
	conn.reply(m.chat, `*Berhasil menghapus ${temp} user bangsat dari list banned*`, m)
}
handler.help = ['unbanall']
handler.tags = ['owner']
handler.command = /^(unbanall)$/i
handler.rowner = true
handler.exp = 0
handler.fail = null
module.exports = handler

