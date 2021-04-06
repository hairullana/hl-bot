let handler = async (m, { conn, text }) => {
	if(isNaN(text)) {
		var number = text.split`@`[1]
	} else if(!isNaN(text)) {
		var number = text
	}
	
	if(!text && !m.quoted) return conn.reply(m.chat, `*[ BANNED FAILED ]*\n\n*Reply target atau sertakan nomor*`, m)
	if(number.length > 15) return conn.reply(m.chat, `*[ BANNED FAILED ]*\n\n*Format nomor tidak valid*`, m)
	
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
			if(global.DATABASE._data.users[user].isBanned == true){
			  conn.reply(m.chat, `*Target sudah masuk ke dalam list banned*`, m)
			}else {
				// denda = Math.ceil((global.DATABASE._data.users[user].exp/100) * 25)
				// global.DATABASE._data.users[user].exp -= denda
        global.DATABASE._data.users[user].isBanned = true
				global.DATABASE._data.banned += 1
				var banTotal = global.DATABASE._data.banned
				conn.reply(m.chat, `*[ BANNED SUCCESS ]*\n\nSukses men-banned @${user.split('@')[0]} dan memberikan status user bangsat\nHubungi owner ( *.owner* ) atau moderator ( *.mods* ) untuk unbanned, tapi harus sadar diri ya bangsat !\n\n○ Total Banned : ${banTotal}`, m,{
					contextInfo: {
						mentionedJid: [user]
					}
				})
			}
	}	
}

handler.help = ['*62xx*','*@user*','*(reply)*'].map(v => 'ban ' + v)
handler.tags = ['owner']
handler.command = /^ban|banned$/i
// handler.owner = true
handler.mods = true
module.exports = handler