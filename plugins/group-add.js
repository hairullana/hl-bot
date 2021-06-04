let handler = async (m, { conn, text }) => {
	return conn.reply(m.chat,"*Fitur dinonaktifkan karena membuat bot terbanned.*\n*Silahkan add manual asu !*",m)
	if(isNaN(text)) {
		var number = text.split`@`[1]
	} else if(!isNaN(text)) {
		var number = text
	}
	
	if(!text && !m.quoted) return conn.reply(m.chat, `*Give a number or reply chat target.*`, m)
	if(number.length > 15) return conn.reply(m.chat, `*Format is Invalid.*`, m)
	
try {
	if(text) {
		var user = number + '@s.whatsapp.net'
	} else if(m.quoted.sender) {
		var user = m.quoted.sender
	} else if(m.mentionedJid) {
		var user = number + '@s.whatsapp.net'
	} 
} catch (e) {
		} finally {
			await conn.groupAdd(m.chat, [user])
	}	
}
handler.help = ['add _62xx_','add _(reply)_']
handler.tags = ['group admin']
handler.command = /^(add)$/i
handler.group = true
handler.fail = null
module.exports = handler