let handler  = async (m, { conn, args }) => {
	if(!args || !args[0]) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Berikan keterangan on atau off*`, m)
	} else if(args[0] == 'on') {
    global.DATABASE.data.maintenance = true
		conn.reply(m.chat, `*❏ MAINTENANCE ON*`, m)
	} else if(args[0] == 'off') {
    global.DATABASE.data.maintenance = false
		conn.reply(m.chat, `*❏ MAINTENANCE OFF*`, m)
	} else {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Berikan keterangan on atau off*`, m)
	} 
}
handler.help = ['self *on/off*']
handler.tags = ['owner']
handler.command = /^(self)$/i
handler.owner = true
handler.fail = null
module.exports = handler