let { Presence } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, text }) => {
	await conn.updatePresence(m.chat, Presence.composing)
	// var name = 'Hairul Lana'
	// var number = global.owner[1]
	// conn.sendVcard(m.chat, name, number, m).then(() =>{
		// conn.reply(m.chat,`*Harap chat owner jika penting saja dan to the point.*\n*Makasih :)*`,m)
	// })

	if(!text){
		return conn.reply(m.chat,`*Masukkan pesan yang ingin disampaikan ke owner.*`)
	}

	conn.reply(owner[1] + `@s.whatsapp.net`, `*Dari: ${conn.getName(m.sender)}*\n*wa.me/${m.sender.split('@')[0]}*\n\n${text}`)
	conn.reply(m.chat,`_Pesan sudah diteruskan ke owner, harap chat jika ada hal penting saja :)_`,m)
}
handler.help = ['owner']
handler.tags = ['info']
handler.command = /^(owner)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.exp = 0
module.exports = handler