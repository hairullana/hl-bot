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
	
  if(isNaN(args[0])) {
    return conn.reply(m.chat, `*[ TRANSFER ERROR ]*\n\nJumlah uangnya pake angka blok !`, m)
  } else {
    var money = args[0]
  }

  money = parseInt(money)
  var tax = Math.ceil((money/100) * 1)
  if (m.sender == m.quoted.sender){
    return conn.reply(m.chat,`*[ TRANSFER ERROR ]*\n\nTidak bisa transfer ke diri sendiri blok !`,m)
  }else if (money < 1){
    return conn.reply(m.chat,`*[ TRANSFER ERROR ]*\n\nDasar miskin !\nTransfer uang kok minus, cuih !`,m)
  }else if (money < 10000){
    return conn.reply(m.chat,'*[ TRANSFER ERROR ]*\n\nDasar miskin !!!\nMinimal Rp. 10.000,- untuk transfer\nkalau ga punya duit gausah sok transfer miskin!',m)
  }else if (global.DATABASE._data.users[m.sender].exp-money-tax < 10000){
    return conn.reply(m.chat,`*[ TRANSFER ERROR ]*\n\nDasar miskin !\nMinimal uangmu Rp. 10.000,- setelah ditransfer\n\nTF (PPN 1%) : *Rp. ${format(money+tax)}*\nSaldo Rek : *Rp. ${format(global.DATABASE._data.users[m.sender].exp)}*`,m)
  }else {
    // return conn.reply(m.chat, user, m)
    global.DATABASE._data.users[m.sender].exp -= money
    global.DATABASE._data.users[m.quoted.sender].exp += money
    global.DATABASE._data.users[m.sender].exp -= tax
    global.DATABASE._data.users["6283119526456@s.whatsapp.net"].exp += tax
    // return conn.reply(m.chat, 'berhasil kontol', m)
    conn.reply(m.chat, `*[ TRANSFER SUCCESS ]*\n\nTransfer *Rp. ${format(money)}* kepada @${m.quoted.sender.split('@')[0]}\nPPN *Rp. ${format(tax)}* (1%)\n\n@${m.quoted.sender.split('@')[0]} : Rp. ${format(global.DATABASE._data.users[m.quoted.sender].exp)}\n@${m.sender.split('@')[0]} : Rp. ${format(global.DATABASE._data.users[m.sender].exp)}`, m, {contextInfo: {
      mentionedJid: [m.quoted.sender,m.sender]
    }})
  }
}

handler.help = ['transfer','tf'].map(v => v + " *total*")
handler.tags = ['xp']
handler.command = /^transfer|tf$/i
handler.owner = false
module.exports = handler