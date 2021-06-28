const { sticker2 } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')

let handler  = async (m, { conn, text }) => {
  if (text) {
    let stiker = await sticker2(null, global.API('xteam', '/ttp', { file: '', text }))
    conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
  }
}
handler.help = ['ttp *text*']
handler.tags = ['sticker']
handler.command = /^ttp$/i
handler.fail = null
module.exports = handler