let { Presence } = require('@adiwajshing/baileys')
let handler  = async (m, { conn,text }) => {
	await conn.updatePresence(m.chat, Presence.composing)
	text = text.toLowerCase()
	let name
	let number
	if (text == global.modsName[0]){
		name = global.modsName[0]
		number = global.mods[0]
		conn.sendVcard(m.chat, name, number, m)
	}else if (text == global.modsName[1]){
		name = global.modsName[1]
		number = global.mods[1]
		conn.sendVcard(m.chat, name, number, m)
	}else if (text == global.modsName[2]){
		name = global.modsName[2]
		number = global.mods[2]
		conn.sendVcard(m.chat, name, number, m)
	}else if (text == global.modsName[3]){
		name = global.modsName[3]
		number = global.mods[3]
		conn.sendVcard(m.chat, name, number, m)
	}else (
		m.reply("*Silahkan pilih kontak moderator :*\n\n.mods loli\n.mods mila\n.mods galang\n.mods ara")
	)
}
handler.help = ['mods']
handler.tags = ['info']
handler.command = /^(mods)$/i
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