const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler  = async (m, { conn, args }) => {
    let stiker = false
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (/image|video/.test(mime)) {
        let img = await q.download()
        if (!img) throw 'Foto/Video tidak ditemukan'
        stiker = await sticker(img, false, global.packname, global.author)
        } else if (args[0]) stiker = await sticker(false, args[0], global.packname, global.author)
    } finally {
        if (stiker) conn.sendMessage(m.chat, stiker, MessageType.sticker, {
        quoted: m
        })
        else throw 'Foto/Video tidak ditemukan'
    }
}
handler.help = ['stickergif *(caption|reply)*','sgif *(caption|reply)*']
handler.tags = ['sticker']
handler.command = /^stickergif|stikergif|sgif$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}