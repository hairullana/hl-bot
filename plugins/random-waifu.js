let fetch = require('node-fetch')

let handler = async(m, { conn, args, command, usedPrefix }) => {
  fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/waifu.txt').then(res => res.text()).then(body => {
    let randomnime = body.split('\n')
    let randomnimex = randomnime[Math.floor(Math.random() * randomnime.length)]
    conn.sendFile(m.chat, randomnimex, '', 'Selamat, ini adalah waifu khayalan anda.', m)
  }).catch(() => {
    conn.reply(m.chat, `*[ FITUR ERROR ]*\n\nMaaf fitur ${command} sedang error !`, m)
  })
}

handler.help = ['waifu']
handler.tags = ['images']
handler.command = /^(waifu)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler