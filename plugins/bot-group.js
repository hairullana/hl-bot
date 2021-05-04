let handler  = async (m, { conn }) => {
  var group = []
  function getRandom(min,max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random()*(max-min+1)) + min
  }

  group[0] = 'https://chat.whatsapp.com/' + (await conn.groupInviteCode('6285892821182-1510584700@g.us'))
  group[1] = 'https://chat.whatsapp.com/' + (await conn.groupInviteCode('6282245496356-1602153905@g.us'))
  pp = await conn.getProfilePicture("6285892821182-1510584700@g.us")
  acak = getRandom(0,1)
  conn.sendFile(m.chat, pp, 'profile.jpg',`*_LTM BOT・チャットボット_*\n\nInfo seputaran bot akan di infokan melalui grup ini\n\n${group[acak]}`, m)
}
handler.help = ['ltm (Group Official)','groupofc']
handler.tags = ['info']
handler.command = /^(groupofc|ltm)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.exp = 250
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler