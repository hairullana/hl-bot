let handler = async (m, { conn, args, participants }) => {
  let member = participants.map(u => u.jid)
  var total = 0
  for (i=0;i<member.length;i++){
    if (member[i].slice(0,2) !== "62"){
      let users = m.isGroup ? participants.find(u => u.jid == member[i]) : {}
      if (!users.isAdmin || !users.isSuperAdmin){
        if (typeof global.DATABASE.data.users[member[i]] == "undefined"){
          await conn.groupRemove(m.chat, [member[i]])
          total++
        }else if (!global.DATABASE.data.users[member[i]].whitelist){
          await conn.groupRemove(m.chat, [member[i]])
          total++
        }
      }
    }
  }
  
  if(total > 0){
    conn.reply(m.chat, `*Berhasil mengusir ${total} orang asing dari grup.*\n\n*NKRI HARGA MATI !!!*`, m)
  }else {
    conn.reply(m.chat, `*Di grup ini tidak ada orang asing.*\n\n*NKRI HARGA MATI !!!*`, m)
  }
}
handler.help = ['antipenjajah','antiasing']
handler.tags = ['xp']
handler.command = /^(antipenjajah|antiasing)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

handler.fail = null
handler.exp = 5000

module.exports = handler

