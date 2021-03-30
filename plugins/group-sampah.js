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
	conn.reply(m.chat, `*${total}/${sum} anggota adalah sampah (join tapi ga pake bot)*\n\n_“Buat apa anda ada di grup ini bung kalau tidak pakai bot”_\n\n*LIST SAMPAH :*\n${sampah.map(v => '  ○ @' + v.replace(/@.+/, '')).join('\n')}`, m,{ contextInfo: { mentionedJid: sampah } })
}
handler.help = ['sampah']
handler.tags = ['group', 'group admin']
handler.command = /^(sampah)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.admin = true
handler.botAdmin = true
handler.fail = null
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)