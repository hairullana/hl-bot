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
	var user = []
	for(let i = 0; i < sum; i++) {
		let users = m.isGroup ? participants.find(u => u.jid == member[i]) : {}
		if(typeof global.DATABASE.data.users[member[i]] != 'undefined') {
      if (global.DATABASE.data.users[member[i]].job != "x"){
        total += 1
        user.push(member[i])
      }
		}
	}
	if(total == 0) return conn.reply(m.chat, `*❏  L I S T  J O B*\n\nTidak ada yang menawarkan jasa apapun di grup ini`, m) 
	conn.reply(m.chat, `*❏  L I S T  J O B*\n\n${user.map(v => '  ○ @' + v.replace(/@.+/, '') + ' [ ' + global.DATABASE.data.users[v].job + ' - Rp. ' + global.DATABASE.data.users[v].price.toLocaleString()  +' ]').join('\n')}\n\nKetik .sewa @user untuk menyewa orang`, m,{ contextInfo: { mentionedJid: user } })
}
handler.help = ['listjob']
handler.tags = ['game']
handler.command = /^(listjob)$/i
handler.group = true
handler.fail = null
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)