let { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text, participants }) => {
  let users = participants.map(u => u.jid)
  return conn.reply(m.chat,"*Fitur dinonaktifkan karena sangat mengganggu bangsat*",m)
  conn.reply(m.chat, text, m, { contextInfo: { mentionedJid: users } })
}
handler.help = ['hidetag','tag'].map(v => v + ' *text*')
handler.tags = ['group admin']
// handler.command = /^(hidetag|tag)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.exp = 500
handler.admin = true
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler

