let { Presence } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, args }) => {
	let text = args.join` `
	if(!args || !args[0]) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Masukkan nama grup.*`, m)
	} else if(args[0].length > 25) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Nama grup maksimal 25 karakter.*`, m)
	} else {
		conn.groupUpdateSubject(m.chat, text)
	} 
}
handler.help = ['setname *text*']
handler.tags = ['group admin']
handler.command = /^(setname)$/i
handler.admin = true
handler.botAdmin = true
handler.group = true
handler.limit = true
handler.fail = null
handler.exp = 0
module.exports = handler