const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')
let handler  = async (m, { conn, text, command }) => {
  // return m.reply(`*Fitur ini sedang error kak.*`)

  if (!text) return conn.reply(m.chat,`Masukkan format yang benar dengan me-reply gambar/video !\nContoh : *.${command} bapak|kau*`,m)
  if (!text.includes("|")) return conn.reply(m.chat,`Masukkan format yang benar dengan me-reply gambar/video !\nContoh : *.${command} bapak|kau*`,m)

  var text1 = text.split('|')[0]
  var text2 = text.split('|')[1]

  let stiker = false
  m.reply(global.wait)
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if ((q.msg || q).seconds > 10) throw '*Stikergif maksimal 10 detik!*'
  if (!mime) throw '*Reply atau caption media yang akan dijadikan stiker*'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
	stiker = await sticker(false, link, text1, text2)
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
}
handler.help = ['swm *author|name*']
handler.tags = ['sticker', 'premium']
handler.command = /^swm$/i
handler.premium = true
handler.limit = true
module.exports = handler
