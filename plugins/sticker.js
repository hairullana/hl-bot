const { MessageType, Presence } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  await conn.updatePresence(m.chat, Presence.composing)
  m.reply(global.wait)
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if ((q.msg || q).seconds > 10) throw '*Stikergif maksimal 10 detik!*'
  if (!mime) throw '*Reply atau caption atau kirim link media yang akan dijadikan stiker*'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
	stiker = await sticker(false, link, global.packname, global.author)
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
}
handler.help = ['sticker', 'stickergif']
handler.tags = ['sticker']
handler.command = /^(sk|sticker|stiker|gif|sgif|skgif|stickergif|stikergif)$/i
handler.limit = true
module.exports = handler