let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw '*Masukkan url yang benar*'
  args[0] = args[0].replace('reel','p')
  let res = await fetch(global.API('xteam', '/dl/ig', {
    url: args[0]
  }, 'APIKEY'))
  if (res.status !== 200) {
    res.text()
    throw res.status
  }
  m.reply(wait)
  let json = await res.json()
  if (!json.result) throw json
  let { name, username, likes, caption, data } = json.result
  let text = `*❏ IG DOWNLOADER*

Username : ${name} *(@${username})*
Likes : ${likes}
Caption :
${caption}
`.trim()
  for (let { data: url, type } of data)
    conn.sendFile(m.chat, url, 'ig' + (type == 'video' ? '.mp4' : '.jpg'), text, m, false , { thumbnail: require('fs').readFileSync('./media/images/thumb.jpg') })
}
handler.help = ['ig','igdl'].map(v => v + ' *url*')
handler.tags = ['downloader']
handler.command = /^(ig(dl)?)$/i
handler.limit = true
module.exports = handler