let { MessageType, Mimetype, Presence } = require('@adiwajshing/baileys')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
let handler = async (m, { conn }) => {
	const content = JSON.stringify(m.message)
	const type = Object.keys(m.message)[0]
	const isVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
	const isAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
	if(!isVideo && !isAudio) return m.reply(`*Reply video / audio untuk di convert menjadi Voicenote*`)
	m.reply(global.wait)
	encmedia = JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
	media = await conn.downloadAndSaveMediaMessage(encmedia)
	ranc = getRandom('.mp3')
	ran = path.join(__dirname, '../tmp', ranc)
	exec(`ffmpeg -i ${media} ${ran}`, (err) => {
	fs.unlinkSync(media)
	if (err) return m.reply(global.error)
		buffer = fs.readFileSync(ran)
		const option = { quoted: m, mimetype: 'audio/mp4', ptt:true }
		conn.voice(m.chat, buffer, option)
		fs.unlinkSync(ran)
	})
}
handler.help = ['tovoice','vn']
handler.tags = ['audio']
handler.command = /^(tovoice|tovn)$/i
handler.owner = false
handler.exp = 0
handler.limit = true
handler.fail = null
module.exports = handler

function getRandom(ext) {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}