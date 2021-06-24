let fs = require('fs')
let timeout = 120000
let poin = 250000
let handler = async (m, { conn, usedPrefix }) => {
    conn.asahotak = conn.asahotak ? conn.asahotak : {}
    let id = m.chat
    if (id in conn.asahotak) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.asahotak[id][0])
        throw false
    }
    
    let asahotak = JSON.parse(fs.readFileSync(`./src/asahotak.json`))
    let random = Math.floor(Math.random() * asahotak.length)
    const res = asahotak[random]
    let json = res
    let caption = `
ASAH OTAK

${json.pertanyaan}

Waktu: ${((timeout / 1000) / 60)} menit
Hadiah: Rp. ${poin.toLocaleString()}
Bantuan: ${usedPrefix}tolong`.trim()
    conn.asahotak[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.asahotak[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${json.jawaban}`, conn.asahotak[id][0])
            delete conn.asahotak[id]
        }, timeout)
    ]
}
handler.help = ['asahotak']
handler.tags = ['game']
handler.command = /^(asahotak)$/i
module.exports = handler