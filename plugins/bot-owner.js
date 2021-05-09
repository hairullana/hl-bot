let { Presence } = require('@adiwajshing/baileys')
let handler  = async (m, { conn }) => {
	await conn.updatePresence(m.chat, Presence.composing)
	var name = 'Hairul Lana'
	var number = '6283119526456'
	conn.sendVcard(m.chat, name, number, m).then(() =>{
		conn.reply(m.chat,`*Harap chat owner jika penting saja dan to the point.*\n*Makasih :)*`,m)
	})
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

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}