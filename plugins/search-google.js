let google = require('google-it')
let handler = async (m, { conn, command, text }) => {
  m.reply(wait)
  try {
		if (!text) return conn.reply(m.chat, Func.example(isPrefix, command, `nodejs tutorial`), m)
		let json = await google({ 'query': text })
		let teks = `❏  G O O G L E - S E A R C H\n\n`
		for (let i=0; i<json.length; i++) {
			teks += '' + (i + 1) + '. ' + json[i].title + '\n'
			teks += '	›  Snippet : ' + json[i].snippet + '\n'
			teks += '	›  Link : ' + json[i].link + '\n\n'
		}
		conn.reply(m.chat, teks, m)
	} catch {
		return conn.reply(m.chat, 'tes', m)
	}
}
handler.help = ['google'].map(v => v + ' *query*')
handler.tags = ['internet']
handler.command = /^google?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler