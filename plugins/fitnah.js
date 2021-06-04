let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return
  let cm = copy(m)
  let who
  if (m.isGroup) who = cm.participant = m.mentionedJid[0]
  else who = m.chat
  if (!who) return conn.reply(m.chat,`*Penggunaan yang benar :*\n\n${usedPrefix + command} mau coli @${m.sender.split('@')[0]} waduh`,m,{contextInfo: {
    mentionedJid: [m.sender]
  }})
  cm.key.fromMe = false
  cm.message[m.mtype] = copy(m.msg)
  let sp = '@' + who.split`@`[0]
  let [fake, ...real] = text.split(sp)
  conn.fakeReply(m.chat, real.join(sp).trimStart(), who, fake.trimEnd()/*, { contextInfo: {
    mentionedJid: [conn.parseMention(real.join(sp))]
  }}*/)
}
handler.command = /^(fitnah)$/
handler.help = ['fitnah _text @user text_']
handler.tags = ['fun','game']
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.exp = 4000
handler.limit = true


module.exports = handler

function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}
