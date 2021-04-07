let { MessageType, Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, participants, command }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	let users = participants.map(u => u.jid)
	for(let i = 0; i < 1; i++) {
		var tag1 = users[Math.floor(users.length * Math.random())]
		var tag2 = users[Math.floor(users.length * Math.random())]
		if (command == "ngentod"){
			conn.reply(m.chat, `*Terciduk @${tag1.replace(/@.+/, '')} & @${tag2.replace(/@.+/, '')} ngentod disemak semak.*`, null, { contextInfo: { mentionedJid: [tag1, tag2] } })
		}else if (command == "jadian"){
			conn.reply(m.chat, `*Selamat @${tag1.replace(/@.+/, '')} 💘💖💓 @${tag2.replace(/@.+/, '')}*\n\n*Semoga langgeng selalu, kalian cocoooook !!!*`, null, { contextInfo: { mentionedJid: [tag1, tag2] } })
		}else{
			conn.reply(m.chat, `*Yang paling ${command} disini adalah @${tag1.replace(/@.+/, '')}.*`, null, { contextInfo: { mentionedJid: [tag1, tag2] } })
		}
	}
}
handler.help = ['ngentod','jadian','babi','anjing','cantik','ganteng','cakep','banci','tolol','setan']
handler.tags = ['tag']
handler.command = /^ngentod|jadian|babi|anjing|cantik|ganteng|cakep|banci|tolol|setan$/i
handler.owner = false
handler.limit = true
handler.fail = null
module.exports = handler