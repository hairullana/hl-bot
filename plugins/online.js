let handler = async (m, { conn, args }) => {
  let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
  let online = [...Object.keys(conn.chats.get(id).presences), conn.user.jid]
  conn.reply(m.chat, '*❏  L I S T  O N L I N E*\n\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, m, {
    contextInfo: { mentionedJid: online }
  })
}
handler.help = ['here','listonline','online']
handler.tags = ['group admin']
handler.command = /^(here|(list)?online)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

handler.fail = null

module.exports = handler

