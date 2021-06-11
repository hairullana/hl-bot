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

	if(global.DATABASE._data.users[user].whitelist == true){
		conn.reply(m.chat, `*@${user.split('@')[0]} sudah berada di whitelist user*`, m, {contextInfo: {
			mentionedJid: [user]
		}})
	}else {
		global.DATABASE._data.users[user].whitelist = true
		conn.reply(m.chat, `*Berhasil menambah @${user.split('@')[0]} di whitelist user*`, m, {contextInfo: {
			mentionedJid: [user]
		}})
	}
}

handler.help = ['_62xx_','_@user_','_(reply)_'].map(v => 'mark ' + v)
handler.tags = ['owner']
handler.command = /^mark$/i
handler.mods = true
module.exports = handler