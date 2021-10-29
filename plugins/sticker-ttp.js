let handler  = async (m, { conn, text }) => {
  if (text) conn.sendFile(m.chat, global.API('xteam', '/ttp', { file: '', text }), 'attp.webp', '', m, false, { asSticker: true })
  else throw '*Masukkan teks nya !*'
}
handler.help = ['ttp *text*']
handler.tags = ['sticker']
handler.command = /^ttp$/i
handler.fail = null
module.exports = handler