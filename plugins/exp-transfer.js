let handler = async (m, { conn, command, args }) => {
  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }
	
  if(!m.quoted) return conn.reply(m.chat, `*[ TRANSFER ERROR ]*\n\nTag orang yang ingin di transfer !`, m)
	if(!args[0]) return conn.reply(m.chat, `*[ TRANSFER ERROR ]*\n\nKasi jumlah uang nya !`, m)
	// if(number.length > 15) return conn.reply(m.chat, `*Format is Invalid.*`, m)
	
try {
	if(isNaN(args[0])) {
		return conn.reply(m.chat, `*[ TRANSFER ERROR ]*\n\nJumlah uangnya pake angka blok !`, m)
	} else {
		var user = m.quoted.sender
    var money = args[0]
	}
  
} catch (e) {
		} finally {
      money = parseInt(money)
      var tax = Math.ceil((money/100) * 0.5)
      if (m.sender == user){
        return conn.reply(m.chat,`*[ TRANSFER ERROR ]*\n\nTidak bisa transfer ke diri sendiri !`,m)
      }else if (money < 1){
        return conn.reply(m.chat,`*[ TRANSFER ERROR ]*\n\nDasar miskin !\nTransfer uang kok minus, cuih !`,m)
      }else if (money < 10000){
        return conn.reply(m.chat,'*[ TRANSFER ERROR ]*\n\nDasar miskin !!!\nMinimal Rp. 10.000,- untuk transfer\nkalau ga punya duit gausah sok transfer miskin!')
      }else if (global.DATABASE._data.users[m.sender]-money-tax < 10000){
        return conn.reply(m.chat,'*[ TRANSFER ERROR ]*\n\nDasar miskin ! Uangmu tidak mencukupi untuk melakukan transfer !\nMinimal uangmu Rp. 10.000,- setelah ditransfer')
      }else {
        // return conn.reply(m.chat, user, m)
        global.DATABASE._data.users[m.sender].exp -= money
        global.DATABASE._data.users[user].exp += money
        global.DATABASE._data.users[m.sender].exp -= tax
        global.DATABASE._data.users[conn.user.jid].exp += money
        // return conn.reply(m.chat, 'berhasil kontol', m)
        conn.reply(m.chat, `Berhasil transfer Rp. ${format(money)} kepada @${user.split('@')[0]} dengan pajak Rp. ${tax}\n\n@${user.split('@')[0]} : Rp. ${format(global.DATABASE._data.users[user].exp)}\n@${m.sender.split('@')[0]} : Rp. ${format(global.DATABASE._data.users[m.sender].exp)}`, m, {contextInfo: {
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