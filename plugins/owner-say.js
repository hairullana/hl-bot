let handler = async (m, { conn, text }) => {
  conn.reply(m.chat,text)
}
handler.help = ['say']
handler.tags = ['owner']
handler.command = /^say$/i
handler.owner = true
module.exports = handler