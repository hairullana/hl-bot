let { MessageType, Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, participants }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	let users = participants.map(u => u.jid)
	for(let i = 0; i < 1; i++) {
		var tag1 = users[Math.floor(users.length * Math.random())]
		var tag2 = users[Math.floor(users.length * Math.random())]
		conn.reply(m.chat, `*Terciduk @${tag1.replace(/@.+/, '')} & @${tag2.replace(/@.+/, '')} ngentod disemak semak.*`, null, { contextInfo: { mentionedJid: [tag1, tag2] } })
	}
}
handler.help = ['']
handler.tags = ['']
handler.command = /^ngentod$/i
handler.owner = false
handler.fail = null
module.exports = handler