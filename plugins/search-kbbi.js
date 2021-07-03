let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Contoh: \n\n${usedPrefix}kbbi membaca`
	try {
			let res = await fetch(global.API('xteam', '/kbbi', { kata: text }, 'APIKEY'))
			let json = await res.json()
			if (json.code == 200){
				let arti = ""
				for(let i = 0; i<json.message.list.length; i++) {
					arti += json.message.list[i] + '\n'
				}
				m.reply(`*❏ KBBI*\n\n*Kata :*\n` + json.message.word + '\n\n*Arti :*\n' + arti)
			}else throw global.error
	} catch (e) {
			console.log(e)
			throw global.error
	}
}
handler.help = ['kbbi *query*']
handler.tags = ['data']
handler.command = /^(kbbi)$/i
handler.fail = null
handler.limit = true
module.exports = handler