let handler  = async (m, { conn, text }) => {
	let users = global.DATABASE.data.users

  var text = ""
  var i = 1
  for (let jid in users){
    if (users[jid].isBanned){
      text += `\n${i}. ${conn.getName(jid)}\n    wa.me/${jid.split('@')[0]}`
      i += 1
    }
  }

  return conn.reply(m.chat,`❏ Daftar Banned\n❏ Total : ${i-1} user\n${text}`,m)
}
handler.help = ['listbanned']
handler.tags = ['bot']
handler.command = /^(listbanned)$/i
handler.exp = 2000
module.exports = handler