let fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')

let timeout = 120000
let poin = 250000

let handler = async (m, { conn, usedPrefix }) => {
    conn.siapaaku = conn.siapaaku ? conn.siapaaku : {}
    let id = m.chat
    if (id in conn.siapaaku) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.siapaaku[id][0])
        throw false
    }
    let res = await fetch(global.API('xteam', '/game/siapakahaku', {}, 'APIKEY'))
    if (res.status !== 200) throw await res.text()
    let json = await res.json()
    let caption = `
SIAPAKAH AKU

*${json.result.soal}*

Timeout ${(timeout / 1000).toFixed(2)} detik
Ketik ${usedPrefix}siapasih untuk clue
Bonus: Rp. ${poin.toLocaleString()}
balas pesan ini untuk menjawab!`.trim()
    conn.siapaaku[id] = [
        await conn.sendMessage(m.chat, caption, MessageType.text, {
            quoted: m
        }),
        json, poin,
        setTimeout(() => {
            if (conn.siapaaku[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${json.result.jawaban}`, conn.siapaaku[id][0])
            delete conn.siapaaku[id]
        }, timeout)
    ]
}
handler.help = ['siapaaku']
handler.tags = ['game']
handler.command = /^siapaaku/i
handler.limit = true
module.exports = handler