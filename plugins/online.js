let handler = async (m, { conn, args }) => {
  let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
  let online = [...Object.keys(conn.chats.get(id).presences), conn.user.jid]
  conn.reply(m.chat, 'List Beban ORTU\nMain HP Terooooosss\n\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, m, {
    contextInfo: { mentionedJid: online }
  })
}
handler.help = ['here','listonline','online']
handler.tags = ['group']
handler.command = /^(here|(list)?online)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.exp = 250

handler.admin = true
handler.botAdmin = true

handler.fail = null

module.exports = handler

