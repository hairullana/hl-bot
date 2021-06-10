let handler = m => m
handler.before = async function (m) {
  if (m.text.match(/(6282215215399)/gi) && !global.DATABASE.data.users[m.sender].whitelist) {
    let denda = Math.ceil(global.DATABASE.data.users[m.sender].exp / 100 * 1)
    global.DATABASE.data.users[m.sender].exp -= denda
    return m.reply(`*Apa sih tag teg tag teg owner, kenal juga kagak*\n\n*Denda : Rp. ${denda.toLocaleString()} (1% Saldo)*`)
  }
}
module.exports = handler