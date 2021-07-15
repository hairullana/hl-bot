let handler  = async (m, { conn, args }) => {
	if(!args || !args[0]) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Berikan keterangan on atau off*`, m)
	} else if(args[0] == 'on') {
    global.DATABASE.data.antiCall = true
		conn.reply(m.chat, `*❏ Anti Call On*`, m)
	} else if(args[0] == 'off') {
    global.DATABASE.data.antiCall = false
		conn.reply(m.chat, `*❏ Anti Call Off*`, m)
	} else {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Berikan keterangan on atau off*`, m)
	} 
}
handler.help = ['anticall *on/off*']
handler.tags = ['owner']
handler.command = /^(anticall)$/i
handler.owner = true
handler.fail = null
module.exports = handler