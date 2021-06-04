const axios = require('axios')

let handler = async(m, { conn, text, usedPrefix }) => {

    if (!text) return conn.reply(m.chat, 'Contoh penggunaan: ' + usedPrefix + 'wikipedia bot', m)

    axios.get(`https://docs-jojo.herokuapp.com/api/wiki?q=` + text)
        .then((res) => {
            conn.reply(m.chat, res.data.result, m)
        })
        .catch()
}
handler.help = ['wiki _query_','wikipedia _query_']
handler.tags = ['data']
handler.command = /^(wiki|wikipedia)$/i
handler.limit = true
handler.fail = null

module.exports = handler