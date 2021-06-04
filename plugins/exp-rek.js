let handler = async (m, { conn, text }) => {
	let money = global.DATABASE.data.users[m.sender].exp
  let limit = global.DATABASE.data.users[m.sender].limit
	
	conn.reply(m.chat, `*❏  R E K E N I N G*\n\nSaldo : Rp. ${money.toLocaleString()}\nLimit : ${limit.toLocaleString()}`, m)
}
handler.help = ['limit','money']
handler.tags = ['xp']
handler.command = /^(limit|money)$/i
module.exports = handler