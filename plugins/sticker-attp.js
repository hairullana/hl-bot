let handler  = async (m, { conn, text }) => {
  if (text) conn.sendFile(m.chat, global.API('xteam', '/attp', { file: '', text }), 'attp.webp', '', m, false, { asSticker: true })
  else throw '*Masukkan teks nya !*'
}
handler.help = ['attp *text*']
handler.tags = ['sticker']
handler.command = /^attp$/i
handler.fail = null
module.exports = handler