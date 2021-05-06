const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler  = async (m, { conn, text, command }) => {
  if (!text) return conn.reply(m.chat,`Masukkan format yang benar !\nContoh : .${command} hairul | lana`,m)
  if (!text.includes("|")) return conn.reply(m.chat,`Masukkan format yang benar !\nContoh : .${command} hairul | lana`,m)

  var text1 = text.split('|')[0]
  var text2 = text.split('|')[1]

  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image|video/.test(mime)) {
      let img = await q.download()
      if (!img) throw 'Foto/Video tidak ditemukan'
      stiker = await sticker(img, false, text1, text2)
    }
  } finally {
    if (stiker) conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
    else throw 'Foto/Video tidak ditemukan'
  }
}
handler.help = ['swm *author*|*name*']
handler.tags = ['sticker', 'premium']
handler.command = /^swm$/i
handler.premium = true
module.exports = handler
