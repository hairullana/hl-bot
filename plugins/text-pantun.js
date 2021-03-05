let fetch = require('node-fetch')

let handler = async(m, { conn }) => {
  fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/pantun.txt').then(res => res.text()).then(body => {
    let splitbijak = body.split('\n')
    let randombijak = splitbijak[Math.floor(Math.random() * splitbijak.length)]
    conn.reply(m.chat, randombijak, m)
  }).catch(() => {
    conn.reply(m.chat, `*[ FITUR ERROR ]*\n\nMaaf fitur pantun sedang error !`, m)
  })
}
handler.help = ['pantun']
handler.tags = ['text']
handler.command = /^(pantun)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler