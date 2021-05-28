let handler = async (m, { conn, text }) => {
	// return conn.reply(m.chat,"*Fitur dinonaktifkan karena membuat bot terbanned.*\n*Silahkan lakukan manual asu !*",m)
	if(isNaN(text) && !text.match(/@/g)){
		return conn.reply(m.chat, `*Penggunaan yang benar*\n\n.demote @user\n.demote -> reply chat`, m)
	}else if(isNaN(text)) {
		var number = text.split`@`[1]
	}else if(!isNaN(text)) {
		var number = text
	}
	
	if(!text && !m.quoted) return conn.reply(m.chat, `*Penggunaan yang benar*\n\n.demote @user\n.demote -> reply chat`, m)
	if(number.length > 15 || (number.length < 9 && number.length > 0)) return conn.reply(m.chat, `*Masukin nomor yg bener gblk !*`, m)
	
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
			conn.groupDemoteAdmin(m.chat, [user]).catch(console.log)
			conn.reply(m.chat, `*Target has demoted.*`, m)
	}	
}
handler.help = ['*62xx*','*@user*','*(reply)*'].map(v => 'member ' + v)
handler.tags = ['group admin']
handler.command = /^(member)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
// handler.admin = true
handler.botAdmin = true
handler.fail = null
module.exports = handler