let { Presence } = require('@adiwajshing/baileys')
let handler  = async (m, { conn }) => {
	if(m.quoted.sender !== global.conn.user.jid) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `Only can delete message from me!`, m)
	} else {
		conn.deleteMessage(m.chat, {id: m.quoted.id, remoteJid: m.chat, fromMe: true})
	} 
}
handler.help = ['del (reply)', 'delete (reply)']
handler.tags = ['premium']
handler.command = /^(del|delete)$/i
handler.premium = true
handler.fail = null
handler.exp = 0
module.exports = handler