let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
  return 'Fitur download dinonaktifkan'
  if (!args[0]) throw '*Masukkan username instagram nya.*'
  let res = await fetch(global.API('xteam', '/dl/igs', {
    nama: args[0]
  }, 'APIKEY'))
  m.reply(wait)
  let json = await res.json()
  if (json.code != 200) throw error
  if (json.result.error) throw json.result.message
  let { username, storylist } = json.result
  let dateConfig = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  for (let { url, type, taken_at } of storylist)
    conn.sendFile(m.chat, url, 'ig' + (type == 'video' ? '.mp4' : '.jpg'), `*❏ IG STORY*

@${username}
Diposting pada ${new Date(taken_at * 1000).toLocaleDateString('id', dateConfig)}`, m)
  // throw json.result
}
handler.help = ['igstory','igs'].map(v => v + ' *username*')
handler.tags = ['downloader']
handler.command = /^(igs(tory)?)$/i
handler.limit = true
handler.premium = true
module.exports = handler