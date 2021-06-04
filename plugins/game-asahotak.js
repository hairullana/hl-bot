let fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')

let timeout = 120000
let poin = 250000

let handler = async (m, { conn, usedPrefix }) => {
    conn.asahotak = conn.asahotak ? conn.asahotak : {}
    let id = m.chat
    if (id in conn.asahotak) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.asahotak[id][0])
        throw false
    }
    let res = await fetch(global.API('xteam', '/game/asahotak', {}, 'APIKEY'))
    if (res.status !== 200) throw await res.text()
    let json = await res.json()
    let caption = `
ASAH OTAK

*${json.result.soal}*

Timeout ${(timeout / 1000).toFixed(2)} detik
Bonus: Rp. ${poin.toLocaleString()}
Ketik ${usedPrefix}tolong untuk clue
balas pesan ini untuk menjawab!`.trim()
    conn.asahotak[id] = [
        await conn.sendMessage(m.chat, caption, MessageType.text, {
            quoted: m
        }),
        json, poin,
        setTimeout(() => {
            if (conn.asahotak[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${json.result.jawaban}`, conn.asahotak[id][0])
            delete conn.asahotak[id]
        }, timeout)
    ]
}
handler.help = ['asahotak']
handler.tags = ['game']
handler.command = /^asahotak/i
handler.limit = true
module.exports = handler