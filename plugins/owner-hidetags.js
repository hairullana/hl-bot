let { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
  let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
  conn.sendMessage(m.chat, text, MessageType.extendedText, { contextInfo: { mentionedJid: users } })
}
handler.help = ['ohidetag','otag'].map(v => v + ' _text_')
handler.tags = ['owner']
handler.command = /^(ohidetag|otag)$/i
handler.owner = true
handler.group = true
handler.fail = null

module.exports = handler
