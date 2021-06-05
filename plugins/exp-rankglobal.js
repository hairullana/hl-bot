let handler = async (m, { conn, args }) => {
  let sortedXP = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].xp - a[1].xp)
  let name = conn.getName(m.sender)
  let usersXP = sortedXP.map(v => v[0])
  let len = args[0] && args[0].length > 0 ? Math.min(1000, Math.max(parseInt(args[0]), 5)) : Math.min(10, sortedXP.length)

  if (args[0] > 100) {
    conn.reply(m.chat, `*Masukkan maksimal 100*`, m)
  }else {
    let text = `
*❏  R A N K  ${len}  B O T*\n
_Kamu berada di *level ${conn.level(global.DATABASE.data.users[m.sender].xp).toLocaleString()}* dengan *${global.DATABASE.data.users[m.sender].xp.toLocaleString()} XP*_
_Kamu peringkat *${usersXP.indexOf(m.sender) + 1}* dari *${usersXP.length}* user_
  
${sortedXP.slice(0, len).map(([user, data], i) => '*' + (i + 1) + '. '  + conn.getName(user) + '*\n    wa.me/' + user.split('@')[0] + '\n    Level ' + conn.level(data.xp).toLocaleString() + ` (` + data.xp.toLocaleString() + ' XP)').join`\n`}
    `.trim()
  
    conn.reply(m.chat, text, m)
  }

}
handler.help = ['rankglobal','rankglobal _total_']
handler.tags = ['xp']
handler.command = /^(rankglobal)$/i
handler.fail = null
handler.exp = 100
module.exports = handler

