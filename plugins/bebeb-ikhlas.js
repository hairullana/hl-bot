let handler = async (m, { conn, text }) => {
  if (global.DATABASE.data.users[m.sender].pasangan == "") return conn.reply(m.chat, `*Kamu sedang tidak menembak siapapun*`, m)
  if (global.DATABASE.data.users[global.DATABASE.data.users[m.sender].pasangan].pasangan == m.sender) return conn.reply(m.chat, `*Kamu sedang berpacaran dengan @${global.DATABASE.data.users[m.sender].pasangan.split('@')[0]} dan tidak sedang di gantung*`, m, {contextInfo: {
    mentionedJid: [global.DATABASE.data.users[m.sender].pasangan]
  }})
  conn.reply(m.chat, `*Kamu sudah mengikhlaskan @${global.DATABASE.data.users[m.sender].pasangan.split('@')[0]} karena dia tidak memberikan jawaban diterima atau ditolak :v*`, m, {contextInfo: {
    mentionedJid: [global.DATABASE.data.users[m.sender].pasangan]
  }})
  global.DATABASE.data.users[m.sender].pasangan = ""
}
handler.help = ['ikhlasin']
handler.tags = ['gabut']
handler.command = /^(ikhlasin)$/i
handler.mods = false
handler.premium = false
handler.group = true
handler.fail = null
module.exports = handler