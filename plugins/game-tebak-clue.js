let handler = async (m, { conn }) => {
  conn.tebak = conn.tebak ? conn.tebak : {}
  let id = m.chat
  if (!(id in conn.tebak)) throw false
  let json = conn.tebak[id][1]
  let nya = json.result.jawaban
  let nyanya = nya.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
  m.reply('' + nyanya + '')
}
handler.command = /^apatuh$/i
handler.limit = true
module.exports = handler