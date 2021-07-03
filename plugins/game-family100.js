let { Presence } = require('@adiwajshing/baileys')
let fs = require('fs')
let timeout = 120000
let poin = 0
let handler = async (m, { conn, usedPrefix }) => {
	// let games = global.DATABASE._data.games
	// let game = global.DATABASE._data.chats[m.chat].game
	await conn.updatePresence(m.chat, Presence.composing) 
	// if(!games) return conn.reply(m.chat, `*Fitur game dimatikan sementara oleh owner.*`, m)
	// if(!game) return conn.reply(m.chat, `*Fitur game belum diaktifkan di grup ini.*`, m)
    conn.quiz = conn.quiz ? conn.quiz : {}
    let id = m.chat
    if (id in conn.quiz) return conn.reply(m.chat, '*^ soal ini belum selesai!*', conn.quiz[id][0])  
    let _quiz = JSON.parse(fs.readFileSync('./src/quiz.json'))
    let mix = Math.floor(Math.random() * _quiz.length)
    const res = _quiz[mix]
    let json = res
    let caption = `
Terdapat *${json.jawaban.length}* jawaban!
Timeout *${((timeout / 1000) / 60)} menit*
*Reply pesan ini untuk menjawab!*`.trim()
    conn.quiz[id] = [
        await conn.reply(m.chat, '*❏ FAMILY 100*\n\n	*Quiz : ' + json.pertanyaan + '*\n\n' + caption, m),
        json, poin,
        setTimeout(() => {
        	conn.updatePresence(m.chat, Presence.composing)
            if (conn.quiz[id]) conn.reply(m.chat, `*Quiz berakhir!*`, conn.quiz[id][0])
			delete conn.quiz[id]
        }, timeout),
		[], [], []
    ]
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^family100/i
module.exports = handler