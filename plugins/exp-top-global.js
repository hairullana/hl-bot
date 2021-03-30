let handler = async (m, { conn, args }) => {
  let sortedExp = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].exp - a[1].exp)
  let sortedLim = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].limit - a[1].limit)
  let name = conn.getName(m.sender)
  let usersExp = sortedExp.map(v => v[0])
  let usersLim = sortedLim.map(v => v[0])
  let len = args[0] && args[0].length > 0 ? Math.min(1000, Math.max(parseInt(args[0]), 5)) : Math.min(10, sortedLim.length)

  if (args[0] > 25) {
    conn.reply(m.chat, `Masukkan max 25 ya bgst, ntar ngelag kntl !`, m)
  }else {
    // format mata uang
    const format = num => {
      const n = String(num),
            p = n.indexOf('.')
      return n.replace(
          /\d(?=(?:\d{3})+(?:\.|$))/g,
          (m, i) => p < 0 || i < p ? `${m},` : m
      )
    }
    
    //yg isi ngetag
    //${sortedExp.slice(0, len).map(([user, data], i) => (i + 1) + '. @' + user.split`@`[0] + ': *' + data.exp + ' Exp*').join`\n`}
    
    var isi = `
• *TOP ${len} LIMIT GLOBAL* •\n
_Kamu punya *Rp. ${format(global.DATABASE.data.users[m.sender].exp)}* dan *${format(global.DATABASE.data.users[m.sender].limit)} Limit*_
_Kamu peringkat *${usersLim.indexOf(m.sender) + 1}* dari *${usersLim.length}* orang_
  
${sortedLim.slice(0, len).map(([user, data], i) => (i + 1) + '. ' + conn.getName(user) + '\n    wa.me/' + user.split('@')[0] + '\n    *' + format(data.limit) + ' Limit*').join`\n`}
    `.trim()
  
  }
  conn.reply(m.chat, isi, m)
  // conn.reply(m.chat, text, m, {
  //   contextInfo: {
  //     mentionedJid: [...usersExp.slice(0, len)]
  //   }
  // })

}
handler.help = ['topglobal','topglobal *total*']
handler.tags = ['xp']
handler.command = /^(topglobal)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 100

module.exports = handler

