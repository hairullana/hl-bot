let limit = 30
let yts = require('yt-search')
const { servers, yta, ytv } = require('../lib/y2mate')
let handler = async (m, { conn, command, text, isPrems, isOwner }) => {
  if (!text) throw `*[ SEARCH ERROR ]*\n\nMasukkan command yang benar, misal :\n*.${command} pale pale*`
  let results = await yts(text)
  let vid = results.all.find(video => video.seconds < 1200) // max 20mnt
  if (!vid) throw '*[ SEARCH ERROR ]*\n\nVideo / Audio Tidak ditemukan'
  let { dl_link, thumb, title, filesize, filesizeF} = await (/2$/.test(command) ? ytv : yta)(vid.url, 'id4')
  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
  conn.sendFile(m.chat, thumb, 'thumbnail.jpg', `
*[ YOUTUBE MP3 ]*

*Judul :* ${title}
*Ukuran :* ${filesizeF}
*URL :* ${vid.url}
*${isLimit ? 'Pakai ': ''}Download :* ${dl_link}

Follow https://instagram.com/loadingtomastah
`.trim(), m)
//   if (!isLimit) conn.sendFile(m.chat, dl_link, title + '.mp' + (3 + /2$/.test(command)), `
// *Title:* ${title}
// *Filesize:* ${filesizeF}
// *Source:* ${vid.url}
// `.trim(), m)
}
handler.help = ['ytmp3','play','music'].map(v => v + ' *query*')
handler.tags = ['downloader']
handler.command = /^play|ytmp3|music|musik$/i

handler.exp = 0
handler.limit = true

module.exports = handler