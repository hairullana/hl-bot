let handler = m => m
handler.before = async (m, { conn }) => {
  if (m.isGroup && global.DATABASE.data.chats[m.chat].moneyired != 0) {
    if (new Date() * 1 >= global.DATABASE.data.chats[m.chat].moneyired) {
      let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
      conn.reply(m.chat, "*Maaf waktunya bot untuk meninggalkan grup :(*\n*Chat owner untuk invite bot lagi*", null, { contextInfo: { mentionedJid: users } }).then(() => {
        let name = 'Hairul Lana'
        let number = global.owner[1]
        conn.sendVcard(m.chat, name, number, null, { contextInfo: { mentionedJid: users } }).then(() => {
          conn.groupLeave(m.chat).then(() => {
            global.DATABASE.data.chats[m.chat].moneyired = 0
          })
        })
      })
    }
  }
}
module.exports = handler