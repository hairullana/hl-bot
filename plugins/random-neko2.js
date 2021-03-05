const axios = require('axios')

let handler = async(m, { conn, text }) => {
    new Promise((resolve, reject) => {
        axios.get(`https://akaneko-api.herokuapp.com/api/neko`)
            .then((res) => {
                conn.sendFile(m.chat, res.data.url, 'image', 'Neko *Nyaa*~', m)
            })
            .catch(reject)
    })

}

handler.help = ['neko']
handler.tags = ['images']
handler.command = /^neko$/i
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