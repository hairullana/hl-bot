let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, participants, text }) => {
	await conn.updatePresence(m.chat, Presence.composing)

	if(!text) {
		return conn.reply(m.chat, `*Masukkan teks!*`, m)
	}

	let users = participants.map(u => u.jid)
	var tag = users[Math.floor(users.length * Math.random())]
	conn.reply(m.chat, `*${text}* ➡️ @${tag.replace(/@.+/, '')}`, null, { contextInfo: { mentionedJid: [tag] } })
}
handler.help = ['tag *text*']
handler.tags = ['tag']
handler.command = /^(tag)$/i
handler.owner = false
handler.limit = true
handler.fail = null
module.exports = handler