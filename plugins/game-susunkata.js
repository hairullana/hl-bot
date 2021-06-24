let fs = require('fs')
let timeout = 120000
let poin = 200000
let handler = async (m, { conn, usedPrefix }) => {
    conn.susunkata = conn.susunkata ? conn.susunkata : {}
    let id = m.chat
    if (id in conn.susunkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.susunkata[id][0])
        throw false
    }
    
    let susunkata = JSON.parse(fs.readFileSync(`./src/susunkata.json`))
    let random = Math.floor(Math.random() * susunkata.length)
    const res = susunkata[random]
    let json = res

    let caption = `
SUSUN KATA

${json.tipe} : ${json.acak}

Waktu: ${((timeout / 1000) / 60)} menit
Hadiah: Rp. ${poin.toLocaleString()}`.trim()
    conn.susunkata[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.susunkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${json.jawaban}`, conn.susunkata[id][0])
            delete conn.susunkata[id]
        }, timeout)
    ]
}
handler.help = ['susunkata']
handler.tags = ['game']
handler.command = /^(susunkata)$/i
module.exports = handler

// function susunkata() {
//     return new Promise((resolve, reject) => {
//         fetch('https://www.cademedia.com/jawaban-tebak-tebakan-susun-kata')
//             .then(res => res.text())
//             .then(res => {
//                 const $ = cheerio.load(res)
//                 data = []
//                 go = $('body').find('article').text()
//                 for (let i = 2; i < 350; i++) {
//                     v = go.split('Level ' + i)[1].split(':')[0]
//                     x = go.split('Level ' + i)[1].split(':')[1]
//                     if (i !== 21 && i !== 51 && i !== 101 && i !== 151 && i !== 201 && i !== 251 && i !== 301) {
//                         if (i == 50 || i == 100 || i == 150 || i == 200 || i == 250 || i == 250 || i == 300) {
//                             y = go.split('Level ' + i)[1].split('Jawaban')[1].split('Susun')[0]
//                         } else {
//                             y = go.split('Level ' + i)[1].split('Jawaban')[1].split('Level')[0]
//                         }
//                         data.push({ tipe: v.trim(), acak: x.replace(/(Jawaban)/gi, '').trim(), jawaban: y.replace(/:/g, '').trim() })
//                         // save json
//                         // fs.writeFileSync('./susunkata.json', JSON.stringify(data))
//                     }
//                 }
//                 data.splice(0, 2)
//                 resolve(data)
//             }).catch(reject)
//     })
// }






// let fetch = require('node-fetch')
// const { MessageType } = require('@adiwajshing/baileys')

// let timeout = 120000
// let poin = 200000

// let handler = async (m, { conn, usedPrefix }) => {
//     conn.susunkata = conn.susunkata ? conn.susunkata : {}
//     let id = m.chat
//     if (id in conn.susunkata) {
//         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.susunkata[id][0])
//         throw false
//     }
//     let res = await fetch(global.API('xteam', '/game/susunkata', {}, 'APIKEY'))
//     if (res.status !== 200) throw await res.text()
//     let json = await res.json()
//     let caption = `
// SUSUN KATA

// *${json.result.soal}*

// Timeout ${(timeout / 1000).toFixed(2)} detik
// Bonus: Rp. ${poin.toLocaleString()}
// balas pesan ini untuk menjawab!`.trim()
//     conn.susunkata[id] = [
//         await conn.sendMessage(m.chat, caption, MessageType.text, {
//             quoted: m
//         }),
//         json, poin,
//         setTimeout(() => {
//             if (conn.susunkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${json.result.jawaban}`, conn.susunkata[id][0])
//             delete conn.susunkata[id]
//         }, timeout)
//     ]
// }
// handler.help = ['susunkata']
// handler.tags = ['game']
// handler.command = /^susunkata/i
// handler.limit = true
// module.exports = handler