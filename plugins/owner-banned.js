let handler = async (m, { conn, text }) => {
	function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }

  text = no(text)
	
	if(isNaN(text)) {
		var number = text.split`@`[1]
	} else if(!isNaN(text)) {
		var number = text
	}
	
	if(!text && !m.quoted) return conn.reply(m.chat, `Reply target atau sertakan nomor*`, m)
	if(number.length > 15) return conn.reply(m.chat, `Format nomor tidak valid*`, m)
	
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
			if(global.DATABASE._data.users[user].banned == true){
			  conn.reply(m.chat, `*Target sudah masuk ke dalam list banned*`, m)
			}else {
        global.DATABASE._data.users[user].banned = true

				let users = global.DATABASE.data.users
				var totalBanned = 0
				for (let jid in users){
					if (users[jid].banned){
						totalBanned += 1
					}
				}
				conn.reply(m.chat, `*Sukses mem-banned @${user.split('@')[0]} dan memberikan status user bangsat*\n\n*Total Banned : ${totalBanned}*`, m,{
					contextInfo: {
						mentionedJid: [user]
					}
				})
				
			}
	}	
}

handler.help = ['banned']
handler.tags = ['owner']
handler.command = /^(ban|banned)$/i
// handler.owner = true
handler.mods = true
module.exports = handler