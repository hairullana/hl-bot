let { Presence } = require('@adiwajshing/baileys')
let handler  = async (m, { conn,text }) => {
	await conn.updatePresence(m.chat, Presence.composing)
	conn.reply(m.chat,`*SC HL BOT*\n\nhttps://github.com/hairullana/hl-bot`,m)
}
handler.help = ['scbot']
handler.tags = ['info']
handler.command = /^(scbot)$/i
module.exports = handler