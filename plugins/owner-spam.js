let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
  var grup = []
  grup[0] = 'http://chat.whatsapp.com/' + (await conn.groupInviteCode('6285892821182-1510584700@g.us'))
  grup[1] = 'http://chat.whatsapp.com/' + (await conn.groupInviteCode('6282245496356-1602153905@g.us'))
  let link = grup[0]
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
  for (let i=0;i<50;i++){
    // conn.sendMessage(m.chat, `*TANAM TANAM UBI TAK PERLU DI BAJE*\n*ADMIN MACEM BABI, MARI KITA WAR SAJE*\n\n*${link}*`,MessageType.extendedText,{ contextInfo: { mentionedJid: users } })
    conn.sendMessage(m.chat, `*SEPI AMAT NI GC SAT, NIH GUE RAMEIN*\n\n*SEKALIAN PROMOSI GC BOT GUA AJA LEBIH RAME SINI JOIN BANGSAAAT*\n\n*${link}*\n*${link}*\n*${link}*`,MessageType.extendedText,{ contextInfo: { mentionedJid: users } })
    await sleep(500)
  }
}
handler.help = ['spam']
handler.tags = []
handler.command = /^(spam)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler