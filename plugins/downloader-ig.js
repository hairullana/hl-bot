let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw '*[ IG DOWNLOADER ]*\n\nMasukkan url yang benar'
  let res = await fetch(global.API('xteam', '/dl/ig', {
    url: args[0]
  }, 'APIKEY'))
  if (res.status !== 200) {
    res.text()
    throw res.status
  }
  conn.reply(m.chat,'*Tunggu sebenar . . .*',m)
  let json = await res.json()
  if (!json.result) return conn.reply(m.chat,json,m)
  let { name, username, likes, caption, data } = json.result
  let text = `
Username: ${name} (@${username})
${likes} Likes
Caption:
${caption}
`.trim()
  for (let { data: url, type } of data)
    conn.sendFile(m.chat, url, 'ig' + (type == 'video' ? '.mp4' : '.jpg'), text, m)
}
handler.help = ['ig','igdl'].map(v => v + ' *url*')
handler.tags = ['downloader']
handler.limit = true
handler.command = /^(ig(dl)?)$/i
module.exports = handler