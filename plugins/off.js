let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
  await conn.updatePresence(m.chat, Presence.composing)
  global.DATABASE.data.chats[m.chat].banned = true
  m.reply('BOT Berhasil *DI NONAKTIFKAN* Untuk Grup Ini !')
}
handler.help = ['off']
handler.tags = ['owner']
handler.command = /^off$/i
handler.owner = true

module.exports = handler