let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	if (!args || !args[0]) return conn.reply(m.chat, `*Format salah!*\n\nContoh : ${usedPrefix + command} hairullana_`, m)
	m.reply(global.wait)
	fetch('https://videfikri.com/api/igstalk/?username=' + args[0])
		.then(res => res.json())
		.then(json => {
			if(json.result.pesan == 'error') return conn.reply(m.chat, `*Akun tidak ditemukan.*`, m)
			 conn.sendFile(m.chat, json.result.profile_hd, 'foto.jpg', `*❏ I G  S T A L K*\n\n	○ *Name* : ${json.result.full_name}\n	○ *Username* : @${json.result.username}\n	○ *Followers* : ${Number(json.result.followers).toLocaleString().replace(/,/g, '.')}\n	○ *Following* : ${Number(json.result.following).toLocaleString().replace(/,/g, '.')}\n	○ *Post* : ${Number(json.result.post_count).toLocaleString().replace(/,/g, '.')}\n	○ *Bio* : ${json.result.bio}`, m)
	}) .catch(() => { conn.reply(m.chat, `*Terjadi kesalahan . . .*`, m) })
}
handler.help = ['igstalk _username_']
handler.tags = ['data']
handler.command = /^(igstalk)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = true
handler.exp = 1000
module.exports = handler