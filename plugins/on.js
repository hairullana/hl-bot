let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
  await conn.updatePresence(m.chat, Presence.composing)
	global.DATABASE._data.chats[m.chat].isBanned = false
	conn.reply(m.chat, `*BOT berhasil di unmute.*`, m)
}
handler.help = ['on']
handler.tags = ['owner']
handler.command = /^on$/i
handler.exp = 0
handler.group = true
handler.private = false
handler.admin = false
handler.owner = true
module.exports = handler
