let handler = async (m, { conn, participants }) => {
  // if (participants.map(v=>v.jid).includes(global.conn.user.jid)) {
    global.DATABASE._data.chats[m.chat].isBanned = true
    m.reply('BOT Berhasil *DI NONAKTIFKAN* Untuk Grup Ini !')
  // } else m.reply('Ada nomor host disini...')
}
handler.help = ['off']
handler.tags = ['group']
handler.command = /^off$/i
handler.owner = true
// handler.group = false
// handler.botAdmin = true

module.exports = handler