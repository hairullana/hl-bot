let handler = async (m, { conn, participants }) => {
  global.DATABASE._data.chats[m.chat].isBanned = true
  m.reply('BOT Berhasil *DI NONAKTIFKAN* Untuk Grup Ini !')
}
handler.help = ['off']
handler.tags = ['owner']
handler.command = /^off$/i
handler.owner = true

module.exports = handler