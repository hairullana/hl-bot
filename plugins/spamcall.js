const axios = require('axios')

let handler = async(m, { conn, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, 'Masukkan nomor tujuan \n\n Contoh penggunaan : ' + usedPrefix + '8xxxxxxxx', m)
    new Promise((resolve, reject) => {
        axios.get(`http://alfians-api.herokuapp.com/api/spamcall?no=${text}`)
            .then((res) => {
                if (res.status == 200) {
                    conn.reply(m.chat, res.logs, m)
                    conn.reply(m.chat, `Sedang melakukan panggilan kepada 0${text}`, m)
                } else {
                    conn.reply(m.chat, res.msg, m)
                }

            })
            .catch(reject)
    })
}
handler.help = ['spamcall _8xx_']
handler.tags = ['tools','premium']
handler.command = /^spamcall?$/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = false
handler.limit = true

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler