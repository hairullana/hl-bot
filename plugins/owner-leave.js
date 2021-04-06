let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
  await conn.groupLeave(m.chat)
}
handler.help = ['pamit']
handler.tags = ['owner']
handler.command = /^(pamit)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler