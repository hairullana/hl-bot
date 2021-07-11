let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	let list = Object.entries(global.DATABASE.data.users)

	let limit = 0
	let money = 0

	list.slice(0, list.length).map(([user, data], i) => (limit += data.limit))
	list.slice(0, list.length).map(([user, data], i) => (money += data.money))

	conn.reply(m.chat, `*❏ HARTA USER*\n\nTotal Uang : Rp. ${money.toLocaleString()}\nTotal Limit : ${limit.toLocaleString()}\n\nRata-Rata Uang : Rp. ${Math.floor(money/list.length).toLocaleString()}\nRata-Rata Limit : ${Math.floor(limit/list.length).toLocaleString()}\n\nTotal User : ${list.length.toLocaleString()}`, m)
}
handler.help = ['total']
handler.tags = ['exp']
handler.command = /^(total)$/i
handler.owner = true
handler.fail = null
module.exports = handler