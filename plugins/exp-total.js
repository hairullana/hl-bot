let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	let list = Object.entries(global.DATABASE.data.users)
	// format mata uang
  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }

	limit = 0
	exp = 0
	x = 0
	list.slice(0, list.length).map(([user, data], i) => (limit += data.limit))
	list.slice(0, list.length).map(([user, data], i) => (exp += data.exp))
	conn.reply(m.chat, `*[ HARTA USER ]*\n\nTotal Uang : Rp. ${format(exp)}\nTotal Limit : ${format(limit)}\n\nRata-Rata Uang : Rp. ${format(Math.floor(exp/list.length))}\nRata-Rata Limit : ${format(Math.floor(limit/list.length))}\n\nTotal User : ${format(list.length)}`, m)
}
handler.help = ['total']
handler.tags = ['exp']
handler.command = /^(total)$/i
// handler.rowner = true
handler.exp = 0
handler.fail = null
module.exports = handler