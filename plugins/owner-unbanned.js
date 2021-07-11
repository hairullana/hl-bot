let handler = async (m, { conn, text }) => {
	function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }

	text = no(text)
	
	const format = num => {
		const n = String(num),
					p = n.indexOf('.')
		return n.replace(
				/\d(?=(?:\d{3})+(?:\.|$))/g,
				(m, i) => p < 0 || i < p ? `${m},` : m
		)
	}

	if(isNaN(text)) {
		var number = text.split`@`[1]
	} else if(!isNaN(text)) {
		var number = text
	}
	
	if(!text && !m.quoted) return conn.reply(m.chat, `Reply target, tag member, atau sertakan nomor`, m)
	if(number.length > 15) return conn.reply(m.chat, `Format nomor tidak valid`, m)
	
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
			if(global.DATABASE._data.users[user].isBanned == false){
			  conn.reply(m.chat, `User tidak masuk ke dalam list banned`, m)
			}else{
				denda = Math.ceil((global.DATABASE._data.users[user].money/100) * 50)
				global.DATABASE._data.users[user].money -= denda
				global.DATABASE._data.users[user].isBanned = false

				let users = global.DATABASE.data.users
				var totalBanned = 0
				for (let jid in users){
					if (users[jid].isBanned){
						totalBanned += 1
					}
				}
				conn.reply(m.chat, `*Sukses men-unbanned @${user.split('@')[0]} dan menghapus status user bangsat dengan denda Rp. ${format(denda)} (50% saldo)*\n\n*Total Banned : ${totalBanned}*`, m,{
					contextInfo: {
						mentionedJid: [user]
					}
				})
			}
	}	
}

handler.help = ['*@tag*','*(reply)*'].map(v => 'unban ' + v)
handler.tags = ['owner']
handler.command = /^(unban|unbanned)$/i
// handler.owner = true
handler.mods = true
module.exports = handler