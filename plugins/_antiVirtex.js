let handler = m => m
handler.before = async (m, {
  conn,
  isBotAdmin,
  antiVirtex,
  isAdmin
}) => {
  if (m.isGroup && !isAdmin && antiVirtex && isBotAdmin && (m.text.match(/(৭৭৭৭৭৭৭৭|๒๒๒๒๒๒๒๒|๑๑๑๑๑๑๑๑|ดุท้่เึางืผิดุท้่เึางื|𐎑⃢𝘼𝙩𝙩𝙖𝙘𝙠|۩꦳|ผิดุท้เึางื)/gi) || m.text.length >= 1000)) {
    conn.groupRemove(m.chat, [m.sender], m).then(() => {
      conn.blockUser(m.sender, "add").then(() => {
        conn.modifyChat(m.chat, 'delete').catch(console.log).then(() => {
          conn.reply(m.chat, `\n`.repeat(100)).then(() => {
            conn.reply(m.chat, `*Ada virtex, tanda telah dibaca dulu.*\n*Jangan lupa bersihkan chat.*`)
          })
        })
      })
    })
  } else if (!m.isGroup && (m.text.match(/(৭৭৭৭৭৭৭৭|๒๒๒๒๒๒๒๒|๑๑๑๑๑๑๑๑|ดุท้่เึางืผิดุท้่เึางื|𐎑⃢𝘼𝙩𝙩𝙖𝙘𝙠|۩꦳|ผิดุท้เึางื)/gi) || m.text.length >= 1000)) {
    conn.blockUser(m.sender, "add").then(() => {
      conn.modifyChat(m.chat, 'delete').catch(console.log).then(() => {
        conn.reply(owner[0] + "@s.whatsapp.net", `*❏ Virtex Detected From @${m.sender.split('@')[0]}*`, null, {
          contextInfo: {
            mentionedJid: [m.sender]
          }
        })
      })
    })
  }
}
module.exports = handler