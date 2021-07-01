const { MessageType, Presence } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
const upload = require('../lib/uploadFile2')
const fetch = require('node-fetch')
let handler  = async (m, { conn, text, usedPrefix, command }) => {
	await conn.updatePresence(m.chat, Presence.composing)
	if (!text) return conn.reply(m.chat, `❏ Format salah!\n\n*Contoh : ${usedPrefix + command} hl|gans*`, m)
	if(!text.match(/[|]/gi)) {
		x = text
		y = ''
	} else {
		let [ pack, author ] = text.split`|`
		x = pack
		y = author
	}
	m.reply(global.wait)
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!/webp/.test(mime)) throw `*Reply sticker untuk di take!*`
    let img = await m.quoted.download()
	if (!img) throw `*Reply sticker untuk di take!*`
		let link = await (upload)(img)
		stiker = await sticker(false, link, x, y)
		conn.sendMessage(m.chat, stiker, MessageType.sticker, { quoted: m }).then(() => {
			fetch(`https://api.indocoder.dev/?del=${link.split('/')[4]}`)
	})
}
handler.help = ['take']
handler.tags = ['sticker','premium']
handler.command = /^(take)$/i
handler.limit = true
module.exports = handler