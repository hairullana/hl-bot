const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { MessageType, Presence } = require('@adiwajshing/baileys')

let handler  = async (m, { conn }) => {
  conn.updatePresence(m.chat, Presence.composing)
  if (!m.quoted) return conn.reply(m.chat, 'Tag stikernya!', m)
  m.reply(global.wait)
  let q = { message: { [m.quoted.mtype]: m.quoted }}
  if (/sticker/.test(m.quoted.mtype)) {
    encmedia = JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
	media = await conn.downloadAndSaveMediaMessage(encmedia)
	ranc = getRandom('.png')
	ran = path.join(__dirname, '../tmp', ranc)
	exec(`ffmpeg -i ${media} ${ran}`, (err, stderr, stdout) => {
	fs.unlinkSync(media)
	if (err) return m.reply(global.error)
		buffer = fs.readFileSync(ran)
		conn.sendFile(m.chat, buffer, '', '', m)
		fs.unlinkSync(ran)
	})
  }
}
handler.help = ['toimg *(reply)*']
handler.tags = ['sticker']
handler.command = /^toimg$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.exp = 500
handler.limit = true

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function getRandom(ext) {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}