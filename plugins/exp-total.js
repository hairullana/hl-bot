let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	let list = Object.entries(global.DATABASE.data.users)

	limit = 0
	exp = 0
	x = 0

	list.slice(0, list.length).map(([user, data], i) => (limit += data.limit))
	list.slice(0, list.length).map(([user, data], i) => (exp += data.exp))

	conn.reply(m.chat, `*❏  H A R T A  U S E R*\n\nTotal Uang : Rp. ${exp.toLocaleString()}\nTotal Limit : ${limit.toLocaleString()}\n\nRata-Rata Uang : Rp. ${Math.floor(exp/list.length).toLocaleString()}\nRata-Rata Limit : ${Math.floor(limit/list.length).toLocaleString()}\n\nTotal User : ${list.length.toLocaleString()}`, m)
}
handler.help = ['total']
handler.tags = ['exp']
handler.command = /^(total)$/i
handler.fail = null
module.exports = handler