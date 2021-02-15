let handler = async (m, { conn, args }) => {
	// if(isNaN(args)) {
	// 	var number = args.split`@`[1]
	// } else if(!isNaN(args)) {
	// 	var number = args
	// }
	
  if(!m.quoted) return conn.reply(m.chat, `*Tag orangnya sayang*`, m)
	if(!args[0]) return conn.reply(m.chat, `*Kasi jumlah limitnya sayang*`, m)
	// if(number.length > 15) return conn.reply(m.chat, `*Format is Invalid.*`, m)
	
try {
	if(isNaN(args[0])) {
		return conn.reply(m.chat, `*Limitnya pake angka sayang*`, m)
	} else {
		var user = m.quoted.sender
    var lim = args[0]
	}
} catch (e) {
		} finally {
      lim = parseInt(lim)
      global.DATABASE._data.users[user].limit += lim
      conn.reply(m.chat, `Berhasil menambahkan ${lim} kepada ${user}\nTotal limit : ${global.DATABASE._data.users[user].limit}`, m)
	}	
}

handler.help = ['addlimit *total*']
handler.tags = ['owner']
handler.command = /^addlimit$/i
handler.owner = true
module.exports = handler