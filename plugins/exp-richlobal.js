let handler = async (m, { conn, args }) => {
  let sortedMoney = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].money - a[1].money)
  let sortedLim = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].limit - a[1].limit)
  let usersMoney = sortedMoney.map(v => v[0])
  let usersLim = sortedLim.map(v => v[0])
  let len = args[0] && args[0].length > 0 ? Math.min(1000, Math.max(parseInt(args[0]), 5)) : Math.min(10, sortedMoney.length)
  if (isNaN(len)) len = 10

  if (args[0] > 100) {
    conn.reply(m.chat, `*Masukkan maksimal 100*`, m)
  }else {
    let text = `
*❏ TOP ${len} TERKAYA GLOBAL*\n
_Kamu punya *Rp. ${global.DATABASE.data.users[m.sender].money.toLocaleString()}* dan *${global.DATABASE.data.users[m.sender].limit.toLocaleString()} Limit*_
_Kamu peringkat *${usersMoney.indexOf(m.sender) + 1}* dari *${usersMoney.length}* orang_
  
${sortedMoney.slice(0, len).map(([user, data], i) => (i + 1) + '. '  + conn.getName(user) + '\n    wa.me/' + user.split('@')[0] + '\n    *Rp. ' + data.money.toLocaleString() + '*').join`\n`}
    `.trim()
  
    conn.reply(m.chat, text, m)
  }

}
handler.help = ['richglobal']
handler.tags = ['xp']
handler.command = /^(richglobal)$/i
handler.fail = null
handler.exp = 100
module.exports = handler

