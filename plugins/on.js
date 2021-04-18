let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
  await conn.updatePresence(m.chat, Presence.composing)
	global.DATABASE._data.chats[m.chat].isBanned = false
	conn.reply(m.chat, `BOT Berhasil *DI AKTIFKAN* Di Grup Ini !`, m)
}
handler.help = ['on']
handler.tags = ['group']
handler.command = /^on$/i
handler.exp = 0
// handler.group = true
handler.private = false
// handler.admin = true
handler.owner = true
// handler.botAdmin = true
module.exports = handler
