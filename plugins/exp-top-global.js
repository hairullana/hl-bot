let handler = async (m, { conn, args }) => {
  let sortedExp = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].exp - a[1].exp)
  let sortedLim = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].limit - a[1].limit)
  let name = conn.getName(m.sender)
  let usersExp = sortedExp.map(v => v[0])
  let usersLim = sortedLim.map(v => v[0])
  let len = args[0] && args[0].length > 0 ? Math.min(1000, Math.max(parseInt(args[0]), 5)) : Math.min(10, sortedLim.length)
  if (isNaN(len)) len = 10

  if (args[0] > 100) {
    conn.reply(m.chat, `*Masukkan maksimal 100*`, m)
  }else {
    var isi = `
*❏ TOP ${len} LIMIT GLOBAL*\n
_Kamu punya *Rp. ${global.DATABASE.data.users[m.sender].exp.toLocaleString()}* dan *${global.DATABASE.data.users[m.sender].limit.toLocaleString()} Limit*_
_Kamu peringkat *${usersLim.indexOf(m.sender) + 1}* dari *${usersLim.length}* orang_
  
${sortedLim.slice(0, len).map(([user, data], i) => (i + 1) + '. ' + conn.getName(user) + '\n    wa.me/' + user.split('@')[0] + '\n    *' + data.limit.toLocaleString() + ' Limit*').join`\n`}
    `.trim()
  }
  
  conn.reply(m.chat, isi, m)
}
handler.help = ['topglobal','topglobal *total*']
handler.tags = ['xp']
handler.command = /^(topglobal)$/i
handler.fail = null
handler.exp = 100
module.exports = handler

