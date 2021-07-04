let handler = m => m
handler.before = async (m, { conn, isPrems }) => {
  let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
	if (isPrems) {
    if (new Date() * 1 >= global.DATABASE.data.users[m.sender].premiumDate) {
      conn.reply(m.chat, "*Maaf waktu untuk status premium anda telah berakhir :(*\n*Chat owner untuk upgrade premium lagi*", m, { contextInfo: { mentionedJid: users } }).then(() => {
        global.DATABASE.data.users[m.sender].premium = false
        let name = 'Hairul Lana'
        let number = global.owner[1]
        conn.sendVcard(m.chat, name, number, null, { contextInfo: { mentionedJid: users } })
      })
    }
  }
}
module.exports = handler