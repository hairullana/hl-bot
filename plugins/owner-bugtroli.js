let handler  = async (m, { conn, text }) => {
  conn.sendFile(m.chat, 'https://asset.kompas.com/crops/AOqycoSV_pH5eU51rYStWW_zVFY=/1x0:1000x666/750x500/data/photo/2019/11/04/5dbfff829ebe6.jpg', 'eror.jpg', '', {
    key: {
      remoteJid: '0@s.whatsapp.net',
      fromMe: false,
    }, message: {
      orderMessage: {
        itemCount: 99999999,
        orderTitle: '',
        sellerJid: '0@s.whatsapp.net',
        jpegThumbnail: ''
      }
    }
  })
}
handler.help = []
handler.tags = []
handler.customPrefix = /^[s]/
handler.command = /^(alkeen)$/i
handler.owner = true
module.exports = handler