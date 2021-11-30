let fs = require ('fs')
const { MessageType } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, usedPrefix: _p, command }) => {
  try {
    let pp = './src/avatar_contact.png'
	  pp = await conn.getProfilePicture(global.conn.user.jid)

    let exp = global.DATABASE.data.users[m.sender].money
    let limit = global.DATABASE.data.users[m.sender].limit
    let xp = global.DATABASE.data.users[m.sender].xp
    let name = conn.getName(m.sender)
    let totalreg = Object.keys(global.DATABASE._data.users).length.toLocaleString()
    let before = ''
    let tags = {
      'info': 'B O T',
      'xp': 'X P',
      'premium': 'P R E M I U M',
      'game': 'G A M E',
      'jadian': 'J A D I A N',
      'sticker': 'S T I C K E R',
      'creator': 'C R E A T O R',
      'data' : 'S E A R C H',
      'tools': 'T O O L',
      'information': 'I N F O R M A T I O N',
      'fun': 'F U N',
      'tag': 'T A G',
      'audio': 'A U D I O',
      'text': 'T E X T',
      'downloader': ' D O W N L O A D',
      'group tools' : 'G R O U P',
      'group admin': 'A D M I N'
    }
    if (command == 'menubot') tags = {'info': 'B O T'}
    else if (command == 'menuxp') tags = {'xp': 'XP'}
    else if (command == 'menupremium') tags = {'premium': 'P R E M I U M'}
    else if (command == 'menugame') tags = {'game': 'G A M E'}
    else if (command == 'menujadian') tags = {'jadian': 'J A D I A N'}
    else if (command == 'menusticker') tags = {'sticker': 'S T I C K E R'}
    else if (command == 'menusearch') tags = {'data' : 'S E A R C H'}
    else if (command == 'menutool') tags = {'tools': 'T O O L'}
    else if (command == 'menuinfo') tags = {'information': 'I N F O R M A T I O N'}
    else if (command == 'menufun') tags = {'fun': 'F U N'}
    else if (command == 'menutag') tags = {'tag': 'T A G'}
    else if (command == 'menuaudio') tags = {'audio': 'A U D I O'}
    else if (command == 'menutext') tags = {'text': 'T E X T'}
    else if (command == 'menudownload') tags = {'downloader': 'D O W N L O A D'}
    else if (command == 'menugroup') tags = {'group tools' : 'G R O U P'}
    else if (command == 'menuadmin') tags = {'group admin': 'A D M I N'}
    else if (command == 'menuowner') tags = {'owner': 'O W N E R'}
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

    

    if (command == 'menu') before = `Hai *%name* (Lv. ${conn.level(xp)[0].toLocaleString()})
Saldo Rp. ${exp.toLocaleString()} (${limit.toLocaleString()} Limit)

» Tutorial bot ? ketik *.help*
» Owner instagram.com/hairullana_

%readmore`

    let header = '❏  *%category*\n'
    let body   = '  » %cmd%islimit'
    let caption  = before + '\n'
    for (let tag in groups) {
      caption += header.replace(/%category/g, 'M E N U  ' + tags[tag]) + '\n'
      for (let menu of groups[tag]) {
        for (let help of menu.help)
          caption += body.replace(/%cmd/g, menu.prefix ? help : '%p' + help).replace(/%islimit/g, menu.limit ? ' (L)' : '')  + '\n'
      }
      caption += '\n'
    }
    if (command != 'menu'){
      caption += ltm
    }
    let replace = {
      '%': '%',
      p: _p,
      exp, limit, name, totalreg,
      readmore: readMore
    }
    caption = caption.replace(new RegExp(`%(${Object.keys(replace).join`|`})`, 'g'), (_, name) => replace[name])
    conn.sendFile(m.chat, fs.readFileSync(`./media/images/thumb.jpg`), 'pp.jpg', caption,m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['info']
handler.command = /^(menu(|bot|xp|premium|game|jadian|sticker|creator|search|tool|info|fun|tag|audio|text|download|group|admin|owner))$/i
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