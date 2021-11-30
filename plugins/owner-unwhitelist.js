let handler = async (m, { conn, text }) => {
	if(!text && !m.quoted) return conn.reply(m.chat, `*Masukkan atau tag nomor user.*`, m)
	let number
	
	if(text) {
		number = conn.number(text)
		if (isNaN(number)) return m.reply(`*Masukkan format nomor yang benar.*`)
		var user = number + '@s.whatsapp.net'
	} else if(m.quoted.sender) {
		var user = m.quoted.sender
	}

	if (typeof global.DATABASE.data.users[user] == "undefined") return m.reply(`*Nomor ${user.split('@')[0]} tidak terdaftar di bot.*`)

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

handler.help = ['unmark']
handler.tags = ['owner']
handler.command = /^unmark$/i
handler.mods = true
module.exports = handler