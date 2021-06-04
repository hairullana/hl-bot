let { Presence } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, args }) => {
	let text = args.join` `
	if(!args || !args[0]) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `Give a text for the name of group`, m)
	} else if(args[0].length > 25) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `Group name max. 25 character!`, m)
	} else {
		conn.groupUpdateSubject(m.chat, text)
	} 
}
handler.help = ['setname _text_']
handler.tags = ['group admin']
handler.command = /^(setname)$/i
handler.admin = true
handler.botAdmin = true
handler.group = true
handler.limit = true
handler.fail = null
handler.exp = 0
module.exports = handler