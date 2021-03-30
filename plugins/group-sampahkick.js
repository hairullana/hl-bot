let { MessageType, Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text, participants }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	let member = participants.map(u => u.jid)
	if(!text) {
		var sum = member.length
	} else {
		var sum = text
	}
	var total = 0

	var sampah = []
	for(let i = 0; i < sum; i++) {
		let users = m.isGroup ? participants.find(u => u.jid == member[i]) : {}
		if(typeof global.DATABASE.data.users[member[i]] == 'undefined' && !users.isAdmin && !users.isSuperAdmin) { 
      total++
      sampah.push(member[i])
		}
	}

	if(total == 0) return conn.reply(m.chat, `*Digrup ini tidak terdapat sampah.*`, m) 

	for(let i = 0; i < sum; i++) {
		let users = m.isGroup ? participants.find(u => u.jid == member[i]) : {}
		if(typeof global.DATABASE.data.users[member[i]] == 'undefined' && !users.isAdmin && !users.isSuperAdmin) { 
			await conn.groupRemove(m.chat, [member[i]])
    }
	}
	conn.reply(m.chat, `*Berhasil mengeluarkan ${total} sampah.*`, m)
}
handler.help = ['kicksampah']
handler.tags = ['group admin']
handler.command = /^(kicksampah)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.admin = true
handler.botAdmin = true
handler.fail = null
module.exports = handler