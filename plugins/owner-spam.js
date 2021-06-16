let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
  let link = "https://chat.whatsapp.com/F8jR0s8hZYJFHPPB07k08M"
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
  for (let i=0;i<50;i++){
    // conn.sendMessage(m.chat, `*TANAM TANAM UBI TAK PERLU DI BAJE*\n*ADMIN MACEM BABI, MARI KITA WAR SAJE*\n\n*${link}*`,MessageType.extendedText,{ contextInfo: { mentionedJid: users } })
    conn.sendMessage(m.chat, `*SEPI AMAT NI GC SAT, NIH GUE RAMEIN*\n\n*SEKALIAN PROMOSI GC BOT GUA AJA LEBIH RAME SINI JOIN BANGSAAAT*\n\n*${link}*\n*${link}*\n*${link}*`,MessageType.extendedText,{ contextInfo: { mentionedJid: users } })
    await sleep(1000)
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