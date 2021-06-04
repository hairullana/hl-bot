let fetch = require('node-fetch')

let handler = async(m, { conn, args, command, usedPrefix }) => {
  fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/random.txt').then(res => res.text()).then(body => {
    let randomnime = body.split('\n')
    let randomnimex = randomnime[Math.floor(Math.random() * randomnime.length)]
    conn.sendFile(m.chat, randomnimex, '', 'dua tiga makan pentol\nwibu kek lu emang tolol', m)
  }).catch(() => {
    m.reply(global.error)
  })
}

handler.help = ['anime']
handler.tags = ['images']
handler.command = /^(anime)$/i
handler.limit = true
handler.fail = null
module.exports = handler