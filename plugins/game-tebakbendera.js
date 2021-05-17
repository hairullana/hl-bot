let fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')

let timeout = 250000
let poin = 200000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
    let id = m.chat
    if (id in conn.tebakbendera) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakbendera[id][0])
        throw false
    }
    let res = await fetch(global.API('xteam', '/game/tebakbendera', {}, 'APIKEY'))
    if (res.status !== 200) throw await res.text()
    let json = await res.json()
    // if (!json.status) throw json
    let caption = `
TEBAK BENDERA

${json.bendera}

Timeout ${(timeout / 1000).toFixed(2)} detik
Ketik ${usedPrefix}clue untuk clue
Bonus: Rp. ${poin.toLocaleString()}
balas pesan ini untuk menjawab!`.trim()
    conn.tebakbendera[id] = [
        await conn.sendMessage(m.chat, caption, MessageType.text, {
            quoted: m
        }),
        json, poin,
        setTimeout(() => {
            if (conn.tebakbendera[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${json.jawaban}`, conn.tebakbendera[id][0])
            delete conn.tebakbendera[id]
        }, timeout)
    ]
}
handler.help = ['tebakbendera']
handler.tags = ['game']
handler.command = /^tebakbendera/i
handler.limit = true
module.exports = handler