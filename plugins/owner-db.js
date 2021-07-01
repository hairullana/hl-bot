let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
  await conn.updatePresence(m.chat, Presence.composing) 
  conn.sendFile(owner[0] + '@s.whatsapp.net',`./hl_`,`hl_`)
}
handler.help = ['db']
handler.tags = ['owner']
handler.command = /^(db)$/i
handler.owner = true
module.exports = handler