let { MessageType, Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text, participants }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	let lama = 86400000 * 10
	let member = participants.map(u => u.jid)
	if(!text) {
		var pesan = "Harap aktif di grup karena akan ada pembersihan member setiap saat"
	} else {
		var pesan = text
	}
	sum = member.length
	var total = 0
	var sider = []
	for(let i = 0; i < sum; i++) {
		let users = m.isGroup ? participants.find(u => u.jid == member[i]) : {}
		if((typeof global.DATABASE.data.users[member[i]] == 'undefined' || global.DATABASE.data.users[member[i]].lastseen < lama) && !users.isAdmin && !users.isSuperAdmin) { 
			if (typeof global.DATABASE.data.users[member[i]] !== 'undefined'){
				if(global.DATABASE.data.users[member[i]].whitelist == false){
					total++
					sider.push(member[i])
				}
			}else {
				total++
				sider.push(member[i])
			}
		}
	}
	if(total == 0) return conn.reply(m.chat, `*Digrup ini tidak terdapat sider.*`, m)
	conn.reply(m.chat, `*${total}/${sum} anggota adalah sider (penyimak profesional) yang tidak aktif selama 1 minggu lebih*\n\n_“${pesan}”_\n\n*LIST SIDER :*\n${sider.map(v => '  ○ @' + v.replace(/@.+/, '')).join('\n')}`, m,{ contextInfo: { mentionedJid: sider } })
}
handler.help = ['sider']
handler.tags = ['group', 'group admin']
handler.command = /^(sider)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
// handler.admin = true
handler.botAdmin = true
handler.fail = null
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)