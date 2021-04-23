let handler  = async (m, { conn, args }) => {
	if(!args || !args[0]) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*[ SELF MODE ]*\n\nBerikan keterangan on atau off !`, m)
	} else if(args[0] == 'on') {
    global.DATABASE.data.selfMode = true
		conn.reply(m.chat, `*[ SELF MODE ]*\n\nBot berhasil di ubah menjadi Self Mode\n\nHanya owner yang dapat menggunakan bot`, m)
	} else if(args[0] == 'off') {
    global.DATABASE.data.selfMode = false
		conn.reply(m.chat, `*[ SELF MODE ]*\n\nBerhasil menonaktifkan mode Self Mode\n\nSemua user bisa menggunakan kembali`, m)
	} else {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*[ SELF MODE ]*\n\nBerikan keterangan on atau off !`, m)
	} 
}
handler.help = ['selfmode *on/off*']
handler.tags = ['owner']
handler.command = /^(selfmode)$/i
handler.owner = true
handler.fail = null
module.exports = handler