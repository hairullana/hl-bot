let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
  let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
  conn.sendMessage(m.chat, text, MessageType.extendedText, { contextInfo: { mentionedJid: users } })
}
handler.help = ['hidetag'].map(v => v + ' *text*')
handler.tags = ['group admin']
handler.command = /^(hidetag)$/i
handler.group = true
handler.admin = true
handler.limit = true
handler.fail = null
module.exports = handler
