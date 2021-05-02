let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
  let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
  conn.sendMessage(m.chat, text, MessageType.extendedText, { contextInfo: { mentionedJid: users } })
}
handler.help = ['hidetag','tag'].map(v => v + ' *text*')
handler.tags = ['owner']
handler.command = /^(hidetag|tag)$/i
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.admin = true
handler.botAdmin = false

handler.fail = null

module.exports = handler
