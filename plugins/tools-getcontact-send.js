let handler  = async (m, { conn, text }) => {
  text = "Result " + text
  number = text.split('+')[1]
  number = number.split(':')[0]

  target = conn.getcontact[number]
  
  conn.reply(target,text)
}
handler.help = ['getcontact']
handler.tags = ['tools','premium']
handler.customPrefix = /^[R]/
handler.command = /^(esult)$/i
handler.fail = null
module.exports = handler