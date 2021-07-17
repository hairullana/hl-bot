

let handler = async(m, { conn, text, usedPrefix }) => {
    axios.get(`https://mnazria.herokuapp.com/api/bmkg-gempa`).then(res => {
        const inidia = `*❏ INFO GEMPA*\n\n*Gempa Terbaru :*\n${res.data.result}\n\n*Saran :*\n${res.data.saran}`
        conn.reply(m.chat, inidia, m)
    })
}
handler.help = ['infogempa', 'gempa']
handler.tags = ['data']
handler.command = /^(infogempa|gempa)$/i
handler.fail = null
module.exports = handler
