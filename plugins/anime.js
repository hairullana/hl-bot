let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	if (!args || !args[0]) return conn.reply(m.chat, `*[ ANIME SEARCHING ]*\n\nFormat salah!\n*Contoh* : _${usedPrefix + command} tokyo ghoul_`, m)
	let text = args.join` `
	await conn.updatePresence(m.chat, Presence.composing) 
	conn.reply(m.chat, `*Sedang mencari data . . .*`, m)
	fetch('http://docs-jojo.herokuapp.com/api/dewabatch?q=' + encodeURIComponent(text))
    	.then(res => res.json())
    	.then(batch => {
    		if(batch.status !== 200) {
    			conn.reply(m.chat, `*[ ANIME SEARCHING ]*\n\nData tidak ditemukan!`, m)   
    		} else {
    			conn.updatePresence(m.chat, Presence.composing) 
    			conn.sendFile(m.chat, batch.thumb, 'thumb.jpg', `*[ ANIME SEARCHING ]*\n\n${batch.result}\n\n${batch.sinopsis}`, m)   
    	}
	}) .catch(() => { conn.reply(m.chat, `_Error!_`, m) })
}
handler.help = ['anime'].map(v => v + ' *query*')
handler.tags = ['data']
handler.command = /^(anime)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = true
handler.exp = 500
module.exports = handler