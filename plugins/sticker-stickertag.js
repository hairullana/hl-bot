const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler = async (m, { conn, args, text, usedPrefix }) => {
    let stiker = false
    let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
    let [author, packname] = text.split('|')
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (/image|video/.test(mime)) {
            let img = await q.download()
            if (!img) throw `kirim/balas gambar/stiker dengan caption ${usedPrefix}stikerwm author|name`
            stiker = await sticker(img, false, author, packname)
        } else if (args[0]) stiker = await sticker(false, args[0], author, packname)
    } finally {
        if (stiker) conn.sendMessage(m.chat, stiker, MessageType.sticker, {
            quoted: m, contextInfo: { mentionedJid: users }
        })
        else throw `kirim gambar dengan caption ${usedPrefix}swm author|name\n\nkamu juga bisa mengubah author & nama, reply stiker yang ingin diubah`
    }
}
handler.help = ['stikertag _author_ | _name_ (caption|reply media)']
handler.tags = ['sticker', 'premium']
handler.command = /^s(tic?ker)?tag$/i
handler.premium = true
module.exports = handler
