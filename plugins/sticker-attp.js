const fetch = require('node-fetch')
const FormData = require('form-data')
const { MessageType } = require('@adiwajshing/baileys')

let handler  = async (m, { conn, text }) => {
  if (text) conn.sendFile(m.chat, global.API('xteam', '/attp', { file: '', text }), 'attp.webp', '', m, false, { asSticker: true })
  else throw 'Uhm...Teksnya?'
}
handler.help = ['attp _text_']
handler.tags = ['sticker']
handler.command = /^attp$/i
handler.fail = null
module.exports = handler