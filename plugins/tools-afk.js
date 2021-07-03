let handler = (m, { text }) => {
  let user = global.DATABASE.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  m.reply(`*${conn.getName(m.sender)} sedang AFK*${text ? '\n\nAlasan : ' + text : ''}`)
}
handler.help = ['afk *reason*']
handler.tags = ['game']
handler.command = /^afk$/i
handler.group = true
module.exports = handler