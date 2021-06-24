let handler = async (m, { conn }) => {
  conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
  let id = m.chat
  if (!(id in conn.tebakkata)) throw false
  let json = conn.tebakkata[id][1]
  let nya = json.jawaban
  let nyanya = nya.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
  m.reply('' + nyanya + '')
}
handler.command = /^apasih$/i
handler.limit = true
module.exports = handler