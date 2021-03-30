// let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, text }) => {
	
  // format mata uang
  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }

	let money = format(global.DATABASE.data.users[m.sender].exp)
  let limit = format(global.DATABASE.data.users[m.sender].limit)
	
	conn.reply(m.chat, `*[ REKENING ]*\n\nSaldo Rp. ${money}\nLimit : ${limit}`, m)
}
handler.help = ['limit','money']
handler.tags = ['xp']
handler.command = /^(limit|money)$/i
handler.exp = 0
handler.limit = false
module.exports = handler