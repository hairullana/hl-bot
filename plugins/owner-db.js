let handler  = async (m, { conn, text }) => {
	let users = global.DATABASE.data.users
  let chats = global.DATABASE.data.chats
  let anu = 86400000 * 14
  let now = new Date() * 1

  if (text == "clean"){
    var user = 0
    for (let jid in users){
      if (now - users[jid].lastseen > anu && !users[jid].whitelist && !users[jid].premium){
        delete users[jid]
        user += 1
      }
    }
    var chat = 0
    for (let jid in chats){
      if  (now - chats[jid].lastseen > anu){
        delete chats[jid]
        chat += 1
      }
    }
    return conn.reply(m.chat,`*Berhasil membersihkan ${user} data user dan ${chat} data chat yang tidak aktif.*`,m)
  }

  var user = 0
  var chat = 0
  for (let jid in users){
    if (now - users[jid].lastseen > anu && !users[jid].whitelist) user += 1
  }
  for (let jid in chats){
    if  (now - chats[jid].lastseen > anu) chat += 1
  }
  return conn.reply(m.chat,`Terdapat *${user} member* dan *${chat} chat* di database yang tidak aktif lebih dari seminggu.\n\nKetik *.db clean* untuk membersihkan data`,m)
}
handler.help = ['db']
handler.tags = ['owner']
handler.command = /^(db)$/i
handler.owner = true
module.exports = handler