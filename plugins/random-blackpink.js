let fetch = require('node-fetch')

let handler = async(m, { conn, args, usedPrefix, command }) => {
  fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/blackpink.txt').then(res => res.text()).then(body => {
    let randomkpop = body.split('\n')
    let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
    conn.sendFile(m.chat, randomkpopx, '', '', m)
  }).catch(() => {
    m.reply(global.error)
  })

}

handler.help = ['blackpinkrandom']
handler.tags = ['images']
handler.command = /^(blackpinkrandom)$/i
handler.fail = null
handler.limit = true

module.exports = handler