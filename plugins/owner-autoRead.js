let handler  = async (m, { conn, args }) => {
	if(!args || !args[0]) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Berikan keterangan on atau off*`, m)
	} else if(args[0] == 'on') {
    global.DATABASE.data.autoRead = true
		conn.reply(m.chat, `*❏ Auto Read On*`, m)
	} else if(args[0] == 'off') {
    global.DATABASE.data.autoRead = false
		conn.reply(m.chat, `*❏ Auto Read Off*`, m)
	} else {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Berikan keterangan on atau off*`, m)
	} 
}
handler.help = ['autoread *on/off*']
handler.tags = ['owner']
handler.command = /^(autoread)$/i
handler.owner = true
handler.fail = null
module.exports = handler