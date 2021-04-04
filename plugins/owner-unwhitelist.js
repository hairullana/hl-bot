let handler = async (m, { conn, text }) => {
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
			if(global.DATABASE._data.users[user].whitelist == false){
			  conn.reply(m.chat, `*@${user.split('@')[0]} tidak berada di whitelist user*`, m, {contextInfo: {
          mentionedJid: [user]
        }})
			}else {
        global.DATABASE._data.users[user].whitelist = false
				conn.reply(m.chat, `*Berhasil menghapus @${user.split('@')[0]} di whitelist user*`, m, {contextInfo: {
          mentionedJid: [user]
        }})
			}
	}	
}

handler.help = ['*62xx*','*@user*','*(reply)*'].map(v => 'unwhitelist ' + v)
handler.tags = ['owner']
handler.command = /^unwhitelist$/i
// handler.owner = true
handler.mods = true
module.exports = handler