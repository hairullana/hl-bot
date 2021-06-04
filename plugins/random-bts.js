let fetch = require('node-fetch')

let handler = async(m, { conn, args, usedPrefix, command }) => {
  fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/bts.txt').then(res => res.text()).then(body => {
    let randomkpop = body.split('\n')
    let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
    conn.sendFile(m.chat, randomkpopx, '', '', m)
  }).catch(() => {
    m.reply(global.error)
  })

}

handler.help = ['bts']
handler.tags = ['images']
handler.command = /^(bts)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 1500
handler.limit = true

module.exports = handler