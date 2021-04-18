let handler = async (m, { conn, text }) => {
  if (global.DATABASE.data.users[m.sender].pasangan == "") return conn.reply(m.chat, `*Kamu sedang tidak menembak siapapun*`, m)
  conn.reply(m.chat, `*Kamu sudah mengikhlaskan @${global.DATABASE.data.users[m.sender].pasangan} karena dia tidak memberikan jawaban diterima atau ditolak :v*`, m, {contextInfo: {
    mentionedJid: [global.DATABASE.data.users[m.sender].pasangan]
  }})
  global.DATABASE.data.users[m.sender].pasangan = ""
}
handler.help = ['ikhlasin']
handler.tags = ['gabut']
handler.command = /^(ikhlasin)$/i
// handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
// handler.limit = true
// handler.admin = true
// handler.botAdmin = true
handler.fail = null
module.exports = handler