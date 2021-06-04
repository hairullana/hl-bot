let { Presence } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, text, participants }) => {
	conn.updatePresence(m.chat, Presence.composing) 
	const delay = time => new Promise(res=>setTimeout(res,time));
	const content = JSON.stringify(m.message)
	const type = Object.keys(m.message)[0]
	const isImage = type === 'extendedTextMessage' && content.includes('imageMessage')
	const isVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
	let groups = conn.chats.array.filter(v => v.jid.endsWith('g.us') && !v.read_only && v.message).map(v => v.jid)
	for (let id of groups) { 
		let users = participants.map(u => u.jid)
		if(isImage || isVideo) {
			var encmedia = JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
			var media = await conn.downloadAndSaveMediaMessage(encmedia)
			if(isImage) { conn.sendFile(id, media, 'image.png', `❏  B R O A D C A S T\n\n${text ? text : m.quoted.caption }`, null) }
			if(isVideo) { conn.sendFile(id, media, 'video.mp4', `❏  B R O A D C A S T\n\n${text ? text : m.quoted.caption }`, null) }
		} else {
			conn.reply(id, `❏  B R O A D C A S T\n\n${text}`, null, { contextInfo: { mentionedJid: users } })
		}
		await delay(2500)
	} conn.reply(m.chat, `Sukses mengirim broadcast.`, m)
}
handler.help = ['broadcast2'].map(v => v + ' _text_')
handler.tags = ['owner']
handler.command = /^(bc2|broadcast2)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler
// conn.reply(id, `❏  B R O A D C A S T\n\n${text}`, null, { contextInfo: { mentionedJid: users } }) }, 5000) 
				// conn.sendFile(id, media, 'image.png', `❏  B R O A D C A S T\n\n${m.quoted.text ? text : m.quoted.text}`, null)