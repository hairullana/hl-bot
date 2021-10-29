let handler = m => m
handler.before = async (m, { conn, isBotAdmin, isAdmin, isOwner,antiLink }) => {
  if (antiLink && m.isGroup && isBotAdmin && !isOwner) {
    var linkGC = 'chat.whatsapp.com/' + (await conn.groupInviteCode(m.chat))
    if (!m.text.includes(linkGC) && m.text.match(/(chat.whatsapp.com)/gi)) {
      if (!isAdmin) conn.groupRemove(m.chat, [m.sender], m)
    }
  }
}
module.exports = handler