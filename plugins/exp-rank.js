let handler = async (m, { conn, args, participants }) => {
  let member = participants.map(u => u.jid)
  let kontol = {}
  for (i=0;i<member.length;i++){
    if (typeof global.DATABASE.data.users[member[i]] != "undefined"){
      kontol[member[i]] = {
        xp: global.DATABASE.data.users[member[i]].xp
      }
    }
  }
  
  let sortedXP = Object.entries(kontol).sort((a, b) => b[1].xp - a[1].xp)
  let name = conn.getName(m.sender)
  let usersXP = sortedXP.map(v => v[0])
  let len = args[0] && args[0].length > 0 ? Math.min(1000, Math.max(parseInt(args[0]), 5)) : Math.min(10, sortedXP.length)
  if (isNaN(len)) len = 10

  if (args[0] > 100) {
    conn.reply(m.chat, `*Masukkan maksimal 100*`, m)
  }else {
    let text = `
*❏ RANK ${len} GRUP*\n
_Kamu berada di *level ${conn.level(global.DATABASE.data.users[m.sender].xp)[0].toLocaleString()}* dengan *${global.DATABASE.data.users[m.sender].xp.toLocaleString()} XP* (${conn.level(global.DATABASE.data.users[m.sender].xp)[2].toLocaleString()} XP lagi untuk naik level)_
_Kamu peringkat *${usersXP.indexOf(m.sender) + 1}* dari *${usersXP.length}* member grup ${conn.getName(m.chat)}_
  
${sortedXP.slice(0, len).map(([user, data], i) => '*' + (i + 1) + '. '  + conn.getName(user) + '*\n    wa.me/' + user.split('@')[0] + '\n    Level ' + conn.level(data.xp)[0].toLocaleString() + " (" + data.xp.toLocaleString() + " / " + conn.level(data.xp)[1].toLocaleString() + ")").join`\n`}
    `.trim()
    conn.reply(m.chat, text, m)
  }

}
handler.help = ['rank (Rank Level)','rank *total*']
handler.tags = ['xp']
handler.command = /^(rank)$/i
handler.group = true
handler.fail = null
handler.exp = 100
module.exports = handler

