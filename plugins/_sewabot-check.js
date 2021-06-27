let handler = m => m
handler.before = async (m, { conn, isPrems }) => {
	if (m.isGroup && global.DATABASE.data.chats[m.chat].expired != 0) {
    if (new Date() * 1 >= global.DATABASE.data.chats[m.chat].expired) {
      conn.reply(m.chat, "*Maaf waktunya bot untuk meninggalkan grup :(*\n*Chat owner untuk invite bot lagi*").then(() => {
        let name = 'Hairul Lana'
        let number = global.owner[1]
        conn.sendVcard(m.chat, name, number).then(() => {
          conn.groupLeave(m.chat).then(() => {
            global.DATABASE.data.chats[m.chat].expired = 0
          })
        })
      })
    }
  }
}
module.exports = handler