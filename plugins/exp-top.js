let handler = async (m, { conn, args, participants }) => {
  let member = participants.map(u => u.jid)
  let kontol = {}
  for (i=0;i<member.length;i++){
    var b = {}
    if (typeof global.DATABASE.data.users[member[i]] != "undefined"){
      kontol[member[i]] = {
        limit: global.DATABASE.data.users[member[i]].limit
      }
    }
  }
  
  let sortedExp = Object.entries(kontol).sort((a, b) => b[1].money - a[1].money)
  let sortedLim = Object.entries(kontol).sort((a, b) => b[1].limit - a[1].limit)
  let name = conn.getName(m.sender)
  let usersExp = sortedExp.map(v => v[0])
  let usersLim = sortedLim.map(v => v[0])
  let len = args[0] && args[0].length > 0 ? Math.min(1000, Math.max(parseInt(args[0]), 5)) : Math.min(10, sortedExp.length)
  if (isNaN(len)) len = 10

  if (args[0] > 100) {
    conn.reply(m.chat, `*Masukkan maksimal 100*`, m)
  }else {let text = `
*❏ TOP ${len} LIMIT*\n
_Kamu punya *Rp. ${global.DATABASE.data.users[m.sender].money.toLocaleString()}* dan *${global.DATABASE.data.users[m.sender].limit.toLocaleString()} Limit*_
_Kamu peringkat *${usersLim.indexOf(m.sender) + 1}* dari *${usersExp.length}* member grup ${conn.getName(m.chat)}_
  
${sortedLim.slice(0, len).map(([user, data], i) => (i + 1) + '. ' + conn.getName(user) + '\n    wa.me/' + user.split('@')[0] + '\n    *' + data.limit.toLocaleString() + ' Limit*').join`\n`}
    `.trim()
  
    conn.reply(m.chat, text, m)
  }

}
handler.help = ['top']
handler.tags = ['xp']
handler.command = /^(top)$/i
handler.group = true
handler.fail = null
handler.exp = 100
module.exports = handler

