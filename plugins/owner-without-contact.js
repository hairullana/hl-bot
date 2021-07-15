let handler  = async (m, { conn, args }) => {
	if(!args || !args[0]) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Berikan keterangan on atau off*`, m)
	} else if(args[0] == 'on') {
    global.DATABASE.data.withoutContact = true
		conn.reply(m.chat, `*❏ Without Contact On*`, m)
	} else if(args[0] == 'off') {
    global.DATABASE.data.withoutContact = false
		conn.reply(m.chat, `*❏ Without Contact Off*`, m)
	} else {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Berikan keterangan on atau off*`, m)
	} 
}
handler.help = ['withoutcontact *on/off*']
handler.tags = ['owner']
handler.command = /^(withoutcontact)$/i
handler.owner = true
handler.fail = null
module.exports = handler