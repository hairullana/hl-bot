let fetch = require('node-fetch')

let timeout = 120000
let poin = 200000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
    let id = m.chat
    if (id in conn.tebakgambar) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgambar[id][0])
        throw false
    }
    let res = await fetch('https://videfikri.com/api/tebakgambar')
    if (res.status !== 200) throw await res.text()
    let result = await res.json()
    let json = result.result
    // if (!json.status) throw json
    let caption = `
TEBAK GAMBAR
Timeout *${(timeout / 1000).toFixed(2)} detik*
Bonus: ${poin} XP
Hint? ketik *${usedPrefix}hint*
balas pesan ini untuk menjawab!`.trim()
    conn.tebakgambar[id] = [
        await conn.sendFile(m.chat, json.soal_gbr, 'error.jpg', caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakgambar[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakgambar[id][0])
            delete conn.tebakgambar[id]
        }, timeout)
    ]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar/i
handler.limit = true
module.exports = handler