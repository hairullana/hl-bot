let handler = (m, { text }) => {
  let user = global.DATABASE.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  m.reply(`*${conn.getName(m.sender)} sedang AFK*\n\n${text ? 'Alasan : ' + text : ''}`)
}
handler.help = ['afk *alasan*']
handler.tags = ['bot']
handler.command = /^afk$/i
module.exports = handler