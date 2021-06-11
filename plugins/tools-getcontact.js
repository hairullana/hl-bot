let handler  = async (m, { conn, text, usedPrefix, commands }) => {
  m.reply(`*Fitur ini belum bisa digunakan karena kamu jelek.*`)
  conn.getcontact = conn.getcontact ? conn.getcontact : {}
  text = conn.number(text)
  if (text.startsWith('0')) text =  "62" + text.substring(1)
  if (!text || isNaN(text)) return m.reply(`*Contoh Format Yang Benar :*\n\n${usedPrefix + command} ${global.conn.user.jid.split('@')[0]}`)

  conn.getcontact[text] = m.chat
  
  conn.reply(`447990653714@s.whatsapp.net`,text)
}
handler.help = ['getcontact']
handler.tags = ['tools','premium']
handler.command = /^(getcontact)$/i
handler.limit = true
handler.premium = true
handler.fail = null
module.exports = handler