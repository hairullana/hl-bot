let { Presence } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, selfMode }) => {
	conn.updatePresence(m.chat, Presence.composing)
  if(selfMode) m.reply(`*Bot maintenance atau dalam perbaikan kak.*`)
  else m.reply(`*${hl}menu* = melihat menu bot\n*${hl}help* = cara menggunakan bot`)
}
handler.customPrefix = /^(b|B)/
handler.command = /^(ot)$/i
module.exports = handler