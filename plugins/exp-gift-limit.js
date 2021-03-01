let handler = async (m, { conn, command, args }) => {
  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }
	
  if(!m.quoted) return conn.reply(m.chat, `*[ ERROR ]*\n\nTag orang yang ingin di transfer limit / gift limit !`, m)
	if(!args[0]) return conn.reply(m.chat, `*[ ERROR ]*\n\nKasi jumlah limitnya !`, m)
	// if(number.length > 15) return conn.reply(m.chat, `*Format is Invalid.*`, m)
	
try {
	if(isNaN(args[0])) {
		return conn.reply(m.chat, `*[ ERROR ]*\n\nJumlah limitnya pake angka blok !`, m)
	} else {
		var user = m.quoted.sender
    var limit = args[0]
	}
  
} catch (e) {
		} finally {
      limit = parseInt(limit)
      var minimal = global.DATABASE._data.users[m.sender].limit - 10
      if (m.sender == user){
        return conn.reply(m.chat,`*[ ERROR ]*\n\nTidak bisa gift limit ke diri sendiri !`,m)
      }else if (limit < 1){
        return conn.reply(m.chat,`*[ ERROR ]*\n\nDasar miskin !\nGift limit kok minus, cuih !`,m)
      }else if (limit > minimal){
        return conn.reply(m.chat,`*[ ERROR ]*\n\nDasar miskin !\nLimit cuma ${global.DATABASE._data.users[m.sender].limit} sok-sok an mau kasi gift\nLimit di atas 10 baru bisa kasi gift gblk!`)
      }else {
        // return conn.reply(m.chat, user, m)
        global.DATABASE._data.users[user].limit += limit
        global.DATABASE._data.users[m.sender].limit -= limit
        // return conn.reply(m.chat, 'berhasil kontol', m)
        conn.reply(m.chat, `Berhasil transfer ${format(limit)} Limit kepada @${user.split('@')[0]}\n\n@${user.split('@')[0]} : ${format(global.DATABASE._data.users[user].limit)} Limit\n@${m.sender.split('@')[0]} : ${format(global.DATABASE._data.users[m.sender].limit)} Limit`, m, {contextInfo: {
          mentionedJid: [user,m.sender]
        }})
      }
	}	
}

handler.help = ['gift','giftlimit'].map(v => v + " *total*")
handler.tags = ['xp']
handler.command = /^gift|giftlimit$/i
handler.owner = false
module.exports = handler