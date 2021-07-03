let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw '*Masukkan url yang benar*'
  args[0] = args[0].replace('reel','p')
  let res = await fetch(global.API('pcode', '/api/ig', {
    url: args[0]
  }, 'apikey'))
  if (res.status !== 200) {
    res.text()
    throw res.status
  }
  m.reply(wait)
  let json = await res.json()
  let text = `*❏ IG DOWNLOADER*

Username : ${json.result.name} *(@${json.result.username})*
Likes : ${json.result.likes}
Caption :
${json.result.caption}
`.trim()
  for (i=0;i<json.result.media_count;i++) conn.sendFile(m.chat, json.result.data[i].data, 'ig' + (json.result.data[i].type == 'video' ? '.mp4' : '.jpg'), text, m, false , { thumbnail: require('fs').readFileSync('./media/images/thumb.jpg') })
}
handler.help = ['ig','igdl'].map(v => v + ' *url*')
handler.tags = ['downloader']
handler.command = /^(ig(dl)?)$/i
handler.limit = true
module.exports = handler