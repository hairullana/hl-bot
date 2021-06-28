let fs = require ('fs')
const { MessageType } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, usedPrefix: _p }) => {
  try {
    let pp = './src/avatar_contact.png'
	  pp = await conn.getProfilePicture(global.conn.user.jid)

    let exp = global.DATABASE.data.users[m.sender].exp.toLocaleString()
    let limit = global.DATABASE.data.users[m.sender].limit.toLocaleString()
    let xp = global.DATABASE.data.users[m.sender].xp.toLocaleString()
    let name = conn.getName(m.sender)
    let d = new Date
    let locale = 'id'
    let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
    let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.DATABASE._data.users).length.toLocaleString()
    let tags = {
      'info': 'I N F O  B O T',
      'xp': 'M O N E Y  &  L I M I T',
      'premium': 'P R E M I U M',
      'game': 'G A M E',
      'gabut': 'J A D I A N',
      'sticker': 'S T I C K E R',
      'creator': 'C R E A T O R',
      'logo': 'L O G O',
      'images' : 'I M A G E S',
      'data' : 'S E A R C H I N G',
      'tools': 'T O O L S',
      'information': 'I N F O R M A T I O N',
      'fun': 'F U N',
      'tag': 'T A G S',
      'audio': 'A U D I O',
      'text': 'R A N D O M  T E X T',
      'downloader': ' D O W N L O A D E R',
      'group tools' : 'G R O U P  T O O L S',
      'group admin': 'G R O U P  A D M I N',
      'owner': 'O W N E R'
    }
    for (let plugin of Object.values(global.plugins))
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!tag in  tags) tags[tag] = tag
    let help = Object.values(global.plugins).map(plugin => {
      return {
        help: plugin.help,
        tags: plugin.tags,
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let menu of help)
        if (menu.tags && menu.tags.includes(tag))
          if (menu.help) groups[tag].push(menu)
    }

    var update = `*❏  U P D A T E*
- Fix beberapa fitur error
- Hapus fitur yg kadaluarsa
- Antilink tidak kick link gc sendiri
- Update antivirtex v2
- Game ZoneWar 5v5 (.war)
- Game tictactoe
- Game family100`

    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || `Hai *%name* (Lv. ${conn.level(xp)[0].toLocaleString()})
Saldo Rp. %exp (%limit Limit)

${update}

» Bingung dengan bot ? Ketik *.help*
» Upgrade user ? Ketik *.infopremium*
» Invite bot ke GC ? Ketik *.sewabot*
%readmore`
    let header = conn.menu.header || '❏  *%category*\n'
    let body   = conn.menu.body   || '  » %cmd%islimit'
    // let footer = conn.menu.footer || '╚════════════════\n'
    let after  = conn.menu.after  || conn.user.jid == global.conn.user.jid ? '' : `\nPowered by https://wa.me/${global.conn.user.jid.split`@`[0]}`
    let _text  = before + '\n'
    for (let tag in groups) {
      _text += header.replace(/%category/g, tags[tag]) + '\n'
      for (let menu of groups[tag]) {
        for (let help of menu.help)
          _text += body.replace(/%cmd/g, menu.prefix ? help : '%p' + help).replace(/%islimit/g, menu.limit ? ' (L)' : '')  + '\n'
      }
      // _text += footer + '\n'
      _text += '\n'
    }
    _text += after
    text =  typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime,
      exp, limit, name, weton, week, date, time, totalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).join`|`})`, 'g'), (_, name) => replace[name])
    conn.sendFile(m.chat, fs.readFileSync(`./media/images/thumb.jpg`), 'pp.jpg', text,m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['info']
handler.command = /^(menu)$/i
handler.fail = null
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}