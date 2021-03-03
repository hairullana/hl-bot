let handler = async (m, { conn, args }) => {
	// if(isNaN(args)) {
	// 	var number = args.split`@`[1]
	// } else if(!isNaN(args)) {
	// 	var number = args
	// }
  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }

  if(!m.quoted) return conn.reply(m.chat, `*Tag orangnya sayang*`, m)
	if(!args[0]) return conn.reply(m.chat, `*Kasi jumlah uang nya sayang*`, m)
	// if(number.length > 15) return conn.reply(m.chat, `*Format is Invalid.*`, m)

try {
	if(isNaN(args[0])) {
		return conn.reply(m.chat, `*Jumlah uangnya pake angka sayang*`, m)
	} else {
		var user = m.quoted.sender
    var money = args[0]
	}
} catch (e) {
		} finally {
      money = parseInt(money)
      global.DATABASE._data.users[user].exp += money
      conn.reply(m.chat, `Berhasil menambahkan Rp. ${format(money)} kepada @${user.split('@')[0]}\nTotal uang : Rp. ${format(global.DATABASE._data.users[user].exp)}`, m, {contextInfo: {
				mentionedJid: [user,m.sender]
			}})
	}	
}

handler.help = ['addmoney *total*']
handler.tags = ['owner']
handler.command = /^addmoney$/i
handler.owner = true
module.exports = handler 