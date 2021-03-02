let handler  = async (m, { conn, args }) => {
	if(!args || !args[0]) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*[ GROUP MODE ]*\n\nBerikan keterangan on atau off !`, m)
	} else if(args[0] == 'on') {
    global.DATABASE._data.groupMode = true
		conn.reply(m.chat, `*[ GROUP MODE ]*\n\nBot berhasil di ubah menjadi Group Only\nBot tidak bisa digunakan di personal chat`, m)
	} else if(args[0] == 'off') {
    global.DATABASE._data.groupMode = false
		conn.reply(m.chat, `*[ GROUP MODE ]*\n\nBerhasil menonaktifkan mode Group Only\nAnda bisa menggunakan bot di personal chat`, m)
	} else {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*[ GROUP MODE ]*\n\nBerikan keterangan on atau off !`, m)
	} 
}
handler.help = ['groupmode *on/off*']
handler.tags = ['owner']
handler.command = /^(groupmode)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.exp = 0
module.exports = handler