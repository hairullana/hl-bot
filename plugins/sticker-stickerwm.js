const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler = async (m, { conn, args, text, usedPrefix }) => {
    let stiker = false
    let [author, packname] = text.split('|')
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (/image|video/.test(mime)) {
            let img = await q.download()
            if (!img) throw `*[ ERROR ]*\n\nFormat salah ! Silahkan kirim atau reply gambar atau stiker dengan caption ${usedPrefix}stikerwm author|name`
            stiker = await sticker(img, false, author, packname)
        } else if (args[0]) stiker = await sticker(false, args[0], author, packname)
    } finally {
        if (stiker) conn.sendMessage(m.chat, stiker, MessageType.sticker, {
            quoted: m
        })
        else throw `*[ ERROR ]*\n\nFormat salah ! Silahkan kirim atau reply gambar atau stiker dengan caption ${usedPrefix}stikerwm author|name`
    }
}
handler.help = ['stikerwm *author*|*name* (prem)']
handler.tags = ['sticker', 'premium']
handler.command = /^s(tic?ker)?wm$/i
handler.premium = true
module.exports = handler
