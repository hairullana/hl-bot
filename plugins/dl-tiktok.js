let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw '*[ TIKTOK DOWNLOADER ]*\n\nMasukkan url yang benar'
  let res = await fetch(global.API('xteam', '/dl/tiktok', {
    url: args[0]
  }, 'APIKEY'))
  conn.reply(m.chat,'*Tunggu sebenar . . .*',m)
  let json = await res.json()
  if (!json.result) conn.reply(m.chat,'*[ TIKTOK DOWNLOADER ]*\n\nSilahkan download video tiktok melalui link di bawah :\n' + json.server_2,m)
//   conn.sendFile(m.chat, json.result.url, 'tiktok.mp4', `
// Username: @${json.result.username}
// `.trim(), m, false, {
//     thumbnail
//   })
}
handler.help = ['tiktok'].map(v => v + ' *url*')
handler.tags = ['downloader','premium']
handler.command = /^(tiktok(dl)?)$/i
handler.premium = true
module.exports = handler