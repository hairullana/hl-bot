let limit = 30
let yts = require('yt-search')
const { servers, yta, ytv } = require('../lib/y2mate')
let handler = async (m, { conn, command, text, isPrems, isOwner }) => {
  return 'Fitur download dinonaktifkan'
  if (!text) throw `Masukkan command yang benar, misal :\n*.${command} pale pale*`
  conn.reply(m.chat,global.wait,m)
  let results = await yts(text)
  let vid = results.all.find(video => video.seconds < 1200) // max 20mnt
  if (!vid) throw 'Video / Audio Tidak ditemukan'
  let { dl_link, thumb, title, filesize, filesizeF} = await (/2$/.test(command) ? ytv : yta)(vid.url, 'id4')
  // let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
  conn.sendFile(m.chat, thumb, 'thumbnail.jpg', `
*❏ YOUTUBE MP3*

*Judul :* ${title}
*Ukuran :* ${filesizeF}
*URL :* ${vid.url}
*Download :* ${dl_link}

${isPrems ? '*Tunggu, file akan segera dikirim karena kamu user premium*' : 'Ingin kirim file ? ketik *.infopremium*'}
`.trim(), m, false , { thumbnail: require('fs').readFileSync('./media/images/thumb.jpg') }).then(() => {
  if (isPrems){
    if (filesize <= 20480){
      conn.sendFile(m.chat, dl_link, title + '.mp' + (3 + /2$/.test(command)), null, m)
    }else {
      m.reply('*Silahkan download sendiri karena file berukuran lebih dari 20 MB.*')
    }
  }
})
}
handler.help = ['ytmp3','play','music'].map(v => v + ' *title*')
handler.tags = ['downloader']
handler.command = /^(play|ytmp3|music|musik)$/i
handler.limit = true
module.exports = handler