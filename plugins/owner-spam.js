let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
  let link = "https://chat.whatsapp.com/DdXhEeD5UfcJosmHCPZzmq"
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
  for (let i=0;i<50;i++){
    // conn.sendMessage(m.chat, `*TANAM TANAM UBI TAK PERLU DI BAJE*\n*ADMIN MACEM BABI, MARI ADU BOT SAJE*\n\n*${link}*`,MessageType.extendedText,{ contextInfo: { mentionedJid: users } })
    conn.sendMessage(m.chat, `*JOIN SINI AJA GAN, OWNER AYANA NYA DAH KABUR LARIIN DUIT ORANG*\n\n*${link}*`,MessageType.extendedText,{ contextInfo: { mentionedJid: users } })
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