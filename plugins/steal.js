const { createExif, modStick } = require("../lib/exif")

let handler = async (m, { conn, args }) => {
  const content = JSON.stringify(m.message)
  const type = Object.keys(m.message)[0]
  const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
  if (!isQuotedSticker) throw m.reply('_*Reply stikernya!*_')
  encmedia = JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
  media = await conn.downloadAndSaveMediaMessage(encmedia)
  anu = args.join(' ').split('|')
  console.log(anu)
  satu = anu[0] !== '' ? anu[0] : global.packname
  dua = typeof anu[1] !== 'undefined' ? anu[1] : global.author
  createExif(satu, dua)
  modStick(media, conn, m, m.chat)
}
handler.help = ['steal (reply only stiker)']
handler.tags = ['sticker']
handler.command = /^(steal)$/i
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