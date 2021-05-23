let { Presence } = require('@adiwajshing/baileys')
let gis = require('g-i-s')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	if (!args || !args[0]) return conn.reply(m.chat, `❏  *Format salah!*\n\n*Contoh : ${usedPrefix + command} kucing*`, m)
	let text = args.join` `
	conn.reply(m.chat, global.wait, m)
	gis(encodeURIComponent(text), logResults)
	function logResults(error, results) {
  	if (error) {
    	conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, global.null, m)
  	} else {
    	var data = JSON.parse(JSON.stringify(results, null, '  '));
    	conn.updatePresence(m.chat, Presence.composing) 
    		for(let i = 0; i < 1; i++) {
    			var rand = Math.floor(data.length * Math.random())
    			conn.sendFile(m.chat, data[rand].url, 'google.png', `›  *${data[rand].width} × ${data[rand].height}*`, m)   
    		}
		}
	}
}
handler.help = ['goimg']
handler.tags = ['data']
handler.command = /^(goimg)$/i
handler.owner = false
handler.fail = null
handler.limit = true
handler.exp = 900
module.exports = handler