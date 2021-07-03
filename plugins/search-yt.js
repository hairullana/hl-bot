let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	if (!args || !args[0]) return conn.reply(m.chat, `Penggunaan Salah !\nContoh : ${usedPrefix + command} pale pale`, m)
	// if(text.match(/(bokep|sex|hentai|gore)/gi)) return conn.reply(m.chat, `*Keyword tidak diizinkan!*`, m)
	let text = args.join` `
	conn.reply(m.chat, global.wait, m)
	fetch('https://api.zeks.xyz/api/yts?q=' + encodeURIComponent(text) + '&apikey=apivinz')
    .then(res => res.json())
    .then(json => {
			var yts = '*❏ YOUTUBE SEARCH*\n\n'
			var i
			for(i = 1; i < 10; i++) {
				// if (json.result[i].channel.id < 0){
					yts += '*' + json.result[i].video.title + '*\n'
					yts += '  *Durasi* : ' + json.result[i].video.duration + '\n'
					yts += '  *Views* : ' + json.result[i].video.views + '\n'
					yts += '  *Uploaded* : ' + json.result[i].video.upload_date + '\n'
					yts += '  *Channel* : ' + json.result[i].uploader.username + '\n'
					yts += '  *Link* : ' + json.result[i].video.url + '\n\n'
				// }
			}
			conn.reply(m.chat, `${yts}`, m)	
		}).catch(() => { conn.reply(m.chat, global.error, m) })
}
handler.help = ['ytsearch','yts'].map(v => v + ' *query*')
handler.tags = ['downloader','data']
handler.command = /^(yts|ytsearch)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = true
handler.exp = 178900
module.exports = handler

function getDuration(s) {
	var date = new Date(null)
	date.setSeconds(s)
	return date.toISOString().substr(11, 8)
}