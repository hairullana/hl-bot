let handler  = async (m, { conn, text }) => {
	let users = global.DATABASE.data.users

  var total = 0
  for (let jid in users){
    if (users[jid].limit < 0){
      users[jid].limit = 0
      total+=1
    }
    if (users[jid].exp < 0){
      users[jid].exp = 0
      total+=1
    }
  }
  return conn.reply(m.chat,`*Berhasil memperbaiki ${total} error di database.*`,m)
}
handler.help = ['bug']
handler.tags = ['owner']
handler.command = /^(bug)$/i
handler.owner = true
module.exports = handler