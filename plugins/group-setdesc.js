let handler  = async (m, { conn, args }) => {
	if(args || args[0]) {
		let text = args.join` `
		var fr = text
	} else if(m.quoted.text) {
		var fr = m.quoted.text
	} else if(args[0] && m.quoted.text) {
		var fr = m.quoted.text
	} 
	conn.groupUpdateDescription(m.chat, fr)
}
handler.help = ['setdesc *text*']
handler.tags = ['group admin']
handler.command = /^(setdesc)$/i
handler.admin = true
handler.botAdmin = true
handler.grup = true
handler.fail = null
module.exports = handler