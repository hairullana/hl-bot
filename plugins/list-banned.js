let handler  = async (m, { conn, text }) => {
	let users = global.DATABASE.data.users

  var text = ""
  var i = 0
  for (let jid in users){
    if (users[jid].banned){
      i += 1
      text += `\n${i}. ${conn.getName(jid)}\n    wa.me/${jid.split('@')[0]}`
    }
  }

  return conn.reply(m.chat,`*❏ LIST BANNED*\n❏ Total : ${i} user\n${text}`,m)
}
handler.help = ['listbanned','bannedlist']
handler.tags = ['bot']
handler.command = /^(listbanned|bannedlist)$/i
handler.exp = 2000
module.exports = handler