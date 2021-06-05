let fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')

let timeout = 120000
let poin = 200000

let handler = async (m, { conn, usedPrefix }) => {
    conn.susunkata = conn.susunkata ? conn.susunkata : {}
    let id = m.chat
    if (id in conn.susunkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.susunkata[id][0])
        throw false
    }
    let res = await fetch(global.API('xteam', '/game/susunkata', {}, 'APIKEY'))
    if (res.status !== 200) throw await res.text()
    let json = await res.json()
    let caption = `
SUSUN KATA

*${json.result.soal}*

Timeout ${(timeout / 1000).toFixed(2)} detik
Bonus: Rp. ${poin.toLocaleString()}
balas pesan ini untuk menjawab!`.trim()
    conn.susunkata[id] = [
        await conn.sendMessage(m.chat, caption, MessageType.text, {
            quoted: m
        }),
        json, poin,
        setTimeout(() => {
            if (conn.susunkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${json.result.jawaban}`, conn.susunkata[id][0])
            delete conn.susunkata[id]
        }, timeout)
    ]
}
handler.help = ['susunkata']
handler.tags = ['game']
handler.command = /^susunkata/i
handler.limit = true
module.exports = handler