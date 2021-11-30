let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn,text }) => {
  let link = "http://chat.whatsapp.com/F8jR0s8hZYJFHPPB07k08M"
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
  for (let i=0;i<50;i++){
    if(!text){
      conn.sendMessage(m.chat, `*TANAM TANAM UBI TAK PERLU DI BAJE*\n*ADMIN MACEM BABI, MARI KITA WAR SAJE*\n\n*${link}*`,MessageType.extendedText,{ contextInfo: { mentionedJid: users } })
    }else {
      conn.sendMessage(m.chat, `*${text}*`,MessageType.extendedText,{ contextInfo: { mentionedJid: users } })
    }
    await sleep(1000)
  }
}
handler.help = ['spam']
handler.tags = []
handler.command = /^(spam)$/i
handler.owner = true
handler.group = true
handler.fail = null
module.exports = handler