let fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')

let timeout = 120000
let poin = 250000

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tekateki[id][0])
        throw false
    }
    let res = await fetch(global.API('xteam', '/game/tebaktebakan', {}, 'APIKEY'))
    if (res.status !== 200) throw await res.text()
    let json = await res.json()
    let caption = `
TEKA TEKI

*${json.result.soal}*

Timeout ${(timeout / 1000).toFixed(2)} detik
Ketik ${usedPrefix}apatuh untuk clue
Bonus: Rp. ${poin.toLocaleString()}
balas pesan ini untuk menjawab!`.trim()
    conn.tekateki[id] = [
        await conn.sendMessage(m.chat, caption, MessageType.text, {
            quoted: m
        }),
        json, poin,
        setTimeout(() => {
            if (conn.tekateki[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${json.result.jawaban}`, conn.tekateki[id][0])
            delete conn.tekateki[id]
        }, timeout)
    ]
}
handler.help = ['tekateki']
handler.tags = ['game']
handler.command = /^tekateki/i
handler.limit = true
module.exports = handler