let { MessageType, Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text, participants }) => {
	const delay = time => new Promise(res=>setTimeout(res,time));
	await conn.updatePresence(m.chat, Presence.composing) 
	var lama = 86400000 * 7
	let member = participants.map(u => u.jid)
	if(!text) {
		var sum = member.length
	} else {
		var sum = text
	}
	var total = 0

	var sider = []
	for(let i = 0; i < sum; i++) {
		let users = m.isGroup ? participants.find(u => u.jid == member[i]) : {}
		if((typeof global.DATABASE.data.users[member[i]] == 'undefined' || new Date() * 1 - global.DATABASE.data.users[member[i]].lastseen > lama) && !users.isAdmin && !users.isSuperAdmin) { 
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

	for(let i = 0; i < sum; i++) {
		let users = m.isGroup ? participants.find(u => u.jid == member[i]) : {}
		if((typeof global.DATABASE.data.users[member[i]] == 'undefined' || new Date() * 1 - global.DATABASE.data.users[member[i]].lastseen > lama) && !users.isAdmin && !users.isSuperAdmin) { 
			if (typeof global.DATABASE.data.users[member[i]] !== 'undefined'){
				if(global.DATABASE.data.users[member[i]].whitelist == false){
					await delay(2500)
					await conn.groupRemove(m.chat, [member[i]])
				}
			}else {
				await delay(2500)
				await conn.groupRemove(m.chat, [member[i]])
			}
		}
	}
	conn.reply(m.chat, `*Berhasil mengeluarkan ${total} sider.*`, m)
}
handler.help = ['kicksider']
handler.tags = ['group admin']
handler.command = /^(kicksider)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.limit = true
handler.fail = null
module.exports = handler