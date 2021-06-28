let fetch = require('node-fetch')
let handler = async(m, { conn }) => {
  fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt')
    .then(res => res.text())
      .then(body => {
        let splitbijak = body.split('\n')
        let randombijak = splitbijak[Math.floor(Math.random() * splitbijak.length)]
        conn.reply(m.chat, randombijak, m)
      })
        .catch(() => {
          conn.reply(m.chat, error, m)
        })
}
handler.help = ['quotes2']
handler.tags = ['text']
handler.command = /^(quotes2)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler