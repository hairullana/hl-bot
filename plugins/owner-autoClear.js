let handler  = async (m, { conn, args }) => {
	if(!args || !args[0]) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Berikan keterangan on atau off*`, m)
	} else if(args[0] == 'on') {
    global.DATABASE.data.autoClear = true
		conn.reply(m.chat, `*❏ Auto Clear On*`, m)
	} else if(args[0] == 'off') {
    global.DATABASE.data.autoClear = false
		conn.reply(m.chat, `*❏ Auto Clear Off*`, m)
	} else {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Berikan keterangan on atau off*`, m)
	} 
}
handler.help = ['autoclear *on/off*']
handler.tags = ['owner']
handler.command = /^(autoclear)$/i
handler.owner = true
handler.fail = null
module.exports = handler