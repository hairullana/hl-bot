let handler = async (m, { conn, command, args }) => {
  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }
	
  if(!m.quoted) return conn.reply(m.chat, `*Tag orangnya !*`, m)
	if(!args[0]) return conn.reply(m.chat, `*Kasi jumlah uang nya !*`, m)
	// if(number.length > 15) return conn.reply(m.chat, `*Format is Invalid.*`, m)
	
try {
	if(isNaN(args[0])) {
		return conn.reply(m.chat, `*Jumlah uangnya pake angka !*`, m)
	} else {
		var user = m.quoted.sender
    var money = args[0]
	}
  
} catch (e) {
		} finally {
      money = parseInt(money)
      var minimal = global.DATABASE._data.users[m.sender].exp - 10000
      if (money < 1){
        return conn.reply(m.chat,`Dasar miskin !\nTransfer uang kok minus, cuih !`,m)
      }else if (money < 10000){
        return conn.reply(m.chat,'Dasar miskin !!!\n\nMinimal Rp. 10.000,- untuk transfer\nkalau ga punya duit gausah sok transfer miskin!')
      }else if (money > minimal){
        return conn.reply(m.chat,'Dasar miskin ! Uangmu tidak mencukupi untuk melakukan transfer !\n\nMinimal uangmu Rp. 10.000,- setelah ditransfer')
      }else {
        // return conn.reply(m.chat, user, m)
        global.DATABASE._data.users[user].exp += money
        global.DATABASE._data.users[m.sender].exp -= money
        // return conn.reply(m.chat, 'berhasil kontol', m)
        conn.reply(m.chat, `Berhasil transfer Rp. ${format(money)} kepada @${user.split('@')[0]}\n\n@${user.split('@')[0]} : Rp. ${format(global.DATABASE._data.users[user].exp)}\n@${m.sender.split('@')[0]} : Rp. ${format(global.DATABASE._data.users[m.sender].exp)}`, m, {contextInfo: {
          mentionedJid: [user,m.sender]
        }})
      }
	}	
}

handler.help = ['transfer','tf'].map(v => v + " *total*")
handler.tags = ['xp']
handler.command = /^transfer|tf$/i
handler.owner = false
module.exports = handler