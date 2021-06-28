const axios = require('axios')

let handler = async(m, { conn, text, usedPrefix }) => {
    axios.get(`https://mnazria.herokuapp.com/api/bmkg-gempa`).then(res => {
        const inidia = `*❏ INFO GEMPA*\n\n*Gempa Terbaru :*\n${res.data.result}\n\n*Saran :*\n${res.data.saran}`
        conn.reply(m.chat, inidia, m)
    })
}
handler.help = ['infogempa', 'gempa']
handler.tags = ['data']
handler.command = /^(infogempa|gempa)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler
