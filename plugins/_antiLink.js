let handler = m => m
handler.before = async (m, { conn, isBotAdmin, isAdmin, isOwner,antiLink }) => {
	if (antiLink && m.isGroup && isBotAdmin && !isOwner) {
    var linkGC = 'chat.whatsapp.com/' + (await conn.groupInviteCode(m.chat))
    if (!m.text.includes(linkGC) && m.text.match(/(chat.whatsapp.com)/gi)) {
      if (m.chat == "6282245496356-1602153905@g.us" || m.chat == "6285892821182-1510584700@g.us") {
          denda = Math.ceil(global.DATABASE.data.users[m.sender].exp / 100 * 25)
          global.DATABASE.data.users[m.sender].exp -= denda
          m.reply(`Share link ke *LTM BOT・チャットボット* dikenakan denda Rp. ${denda.toLocaleString()} (25% Saldo)`)
      }
      if (!isAdmin) conn.groupRemove(m.chat, [m.sender], m)
    }
  }
}
module.exports = handler