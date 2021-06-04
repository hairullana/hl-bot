let handler  = async (m, { conn, args }) => {
	if(!args || !args[0]) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*❏  A D M I N  M O D DE*\n\nBerikan keterangan on atau off !`, m)
	} else if(args[0] == 'on') {
    global.DATABASE.data.chats[m.chat].adminMode = true
		conn.reply(m.chat, `*❏  A D M I N  M O D DE*\n\nBot berhasil di ubah menjadi Admin Mode\n\nHanya admin yang dapat menggunakan bot di grup ini`, m)
	} else if(args[0] == 'off') {
    global.DATABASE.data.chats[m.chat].adminMode = false
		conn.reply(m.chat, `*❏  A D M I N  M O D DE*\n\nBerhasil menonaktifkan Admin Mode\n\nSemua anggota grup bisa menggunakan bot di grup ini`, m)
	} else {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*❏  A D M I N  M O D DE*\n\nBerikan keterangan on atau off !`, m)
	} 
}
handler.help = ['adminmode _on/off_']
handler.tags = ['group admin']
handler.command = /^(adminmode)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
handler.limit = true
handler.fail = null
handler.exp = 5000
module.exports = handler