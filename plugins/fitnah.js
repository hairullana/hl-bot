let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
  if (!text) return
  let cm = copy(m)
  let who
  if (m.isGroup) who = cm.participant = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw 'Tag orang lah gan !'
  cm.key.fromMe = false
  cm.message[m.mtype] = copy(m.msg)
  let sp = '@' + who.split`@`[0]
  let [fake, ...real] = text.split(sp)
  conn.fakeReply(m.chat, real.join(sp).trimStart(), who, fake.trimEnd()/*, { contextInfo: {
    mentionedJid: [conn.parseMention(real.join(sp))]
  }}*/)
}
handler.command = /^(fitnah)$/
handler.help = ['fitnah <teks> @user <teks>']
handler.tags = ['fun']
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.exp = 250
handler.limit = false


module.exports = handler

function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}
