let handler = async (m, { conn }) => {
  conn.tekateki = conn.tekateki ? conn.tekateki : {}
  let id = m.chat
  if (!(id in conn.tekateki)) throw false
  let json = conn.tekateki[id][1]
  let nya = json.result.jawaban
  let nyanya = nya.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
  m.reply('' + nyanya + '')
}
handler.command = /^apatuh$/i
handler.limit = true
module.exports = handler