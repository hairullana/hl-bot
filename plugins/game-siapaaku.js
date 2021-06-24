let fs = require('fs')
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
    
    let siapaaku = JSON.parse(fs.readFileSync(`./src/siapaaku.json`))
    let random = Math.floor(Math.random() * siapaaku.length)
    const res = siapaaku[random]
    let json = res

    let caption = `
SIAPAKAH AKU

*${json.pertanyaan}*

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
            if (conn.siapaaku[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${json.jawaban}`, conn.siapaaku[id][0])
            delete conn.siapaaku[id]
        }, timeout)
    ]
}
handler.help = ['siapaaku']
handler.tags = ['game']
handler.command = /^siapaaku/i
handler.limit = true
module.exports = handler