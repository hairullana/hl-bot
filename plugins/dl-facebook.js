let { Presence } = require('@adiwajshing/baileys')
let fb = require('../mine/fb')
let handler = async (m, { conn, text, usedPrefix, command }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	if (!text) return conn.reply(m.chat, `❏ Format salah!\n\n*Contoh : ${usedPrefix + command} https://m.facebook.com/peopleareawesome/videos/1393626100686564/*`, m)
	if (!text.match(/(facebook.com)/gi)) return conn.reply(m.chat, `Perintah ini untuk mendownload postingan video facebook.`, m)
	if (text.match(/(\/watch\/)/gi)) return conn.reply(m.chat, `Fitur ini belum mendukung untuk mendownload FB Watch.`, m)
	if (text.match(/(\/groups\/)/gi)) return conn.reply(m.chat, `Fitur ini belum mendukung untuk mendownload postingan grup.`, m)
	m.reply(wait)
	let json = await fb(text)
		if(json.status == false) return m.reply(global.error)
    	conn.updatePresence(m.chat, Presence.composing)
		file = (json.data.hd).split('/')[5].split('?')[0]
    // m.reply(json.data.hd)
		conn.sendFile(m.chat, json.data.hd, ltm, null, m)
		// m.reply(`› File masuk kemana?\n\n- /WhatsApp/media/WhatsApp Documents (WA Ori)\n- /WhatsApp Business/media/WhatsApp Business Documents (WA Bisnis)`)
}
handler.help = ['fb','facebook']
handler.tags = ['download']
handler.command = /^(facebook|fb)$/i
handler.owner = false
handler.limit = true
module.exports = handler 


// // let fb = require('../lib/fb')
// let fetch = require('node-fetch')
// let handler = async (m, { conn, args, usedPrefix, command }) => {
//     if (!args[0]) throw `Perintah ini untuk mengunduh postingan video facebook\n\ncontoh:\n${usedPrefix + command} https://m.facebook.com/peopleareawesome/videos/1393626100686564/`
//     if (!args[0].match(/(facebook.com)/gi)) throw `Perintah ini untuk mengunduh postingan video facebook\n\ncontoh:\n${usedPrefix + command} https://m.facebook.com/peopleareawesome/videos/1393626100686564/`
//     // let json = await fb(`${args[0]}`)
//     // if (json.status == false) throw global.mati
//     // m.reply(json)
//     // file = (json.data.hd).split('/')[5].split('?')[0]
//     // conn.sendFile(m.chat, json.data.hd, file, null, m, false, { asDocument: true }).then(() => {
//     //     m.reply(`› File masuk kemana?\n\n- /WhatsApp/media/WhatsApp Documents (WA Ori)\n- /WhatsApp Business/media/WhatsApp Business Documents (WA Bisnis)`)
//     // })
//     // conn.sendFile(m.chat, json.data.hd, file, '© stikerin', m)
//     // fb(args[0]).then(r => {
//     //     let res = JSON.stringify(r)
//     //     let json = JSON.parse(res)
//     //     file = (json.data.hd).split('/')[5].split('?')[0]
//     //     conn.sendFile(m.chat, json.data.hd, file, '© stikerin', m)
//     // })
//     let res = await fetch(global.API('neo', '/api/download/fb', { url: args[0] }, 'apikey'))
//     let json = await res.json()
//     if (json.status != true) throw global.mati
//     file = (json.data.hd).split('/')[5].split('?')[0]
//     conn.sendFile(m.chat, json.data.hd, file, '© stikerin', m)
// }
// handler.help = ['fb'].map(v => v + ' link')
// handler.tags = ['downloader']
// handler.command = /^(fb|facebook)$/i
// handler.limit = true
// module.exports = handler