let { Presence } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, text }) => {
	await conn.updatePresence(m.chat, Presence.composing)
  var name
  if (text) name = text
  else name = conn.getName(m.sender)
	var number = m.sender.split('@')[0]
	conn.sendVcard(m.chat, name, number, m)
}
handler.help = ['me','saveme','save']
handler.tags = ['tools']
handler.command = /^(me|saveme|save)$/i
handler.group = true
handler.fail = null
module.exports = handler