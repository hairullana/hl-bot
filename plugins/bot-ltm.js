let handler  = async (m, { conn }) => {
  var group = []
  function getRandom(min,max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random()*(max-min+1)) + min
  }

  group[0] = 'https://chat.whatsapp.com/' + (await conn.groupInviteCode('6285892821182-1510584700@g.us'))
  group[1] = 'https://chat.whatsapp.com/' + (await conn.groupInviteCode('6282245496356-1602153905@g.us'))
  acak = getRandom(0,1)
  m.reply(`*LTM BOT・チャットボット*\n\n${group[acak]}`)
}
handler.help = ['ltm (Group Official)']
handler.tags = ['info']
handler.command = /^(ltm)$/i
handler.fail = null
module.exports = handler