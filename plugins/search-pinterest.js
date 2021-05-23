let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	if (!args || !args[0]) return conn.reply(m.chat, `❏  *Format salah!\n\nContoh :*\n\n*${usedPrefix + command} hosico*`, m)
	let text = args.join` `
	await conn.updatePresence(m.chat, Presence.composing) 
	conn.reply(m.chat, global.search, m)
	fetch('http://fdciabdul.tech/api/pinterest?keyword=' + encodeURIComponent(text))
    	.then(res => res.json())
    	.then(json => {
    		var data = JSON.parse(JSON.stringify(json))
    		conn.updatePresence(m.chat, Presence.composing) 
    		for(let i = 0; i < 1; i++) {
    			var rand = Math.floor(data.length * Math.random())
    			conn.sendFile(m.chat, data[rand], 'pin.jpg', '', m)   
    		}
	}) .catch(() => { conn.reply(m.chat, global.error, m) })
}
handler.help = ['pinterest']
handler.tags = ['data']
handler.command = /^(pinterest)$/i
handler.owner = false
handler.fail = null
handler.limit = true
handler.exp = 10900
module.exports = handler