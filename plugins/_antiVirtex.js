let handler = m => m
handler.before = async (m, { conn, isBotAdmin, antiVirtex }) => {
	if (m.isGroup && antiVirtex && isBotAdmin && (m.text.match(/(৭৭৭৭৭৭৭৭|๒๒๒๒๒๒๒๒|๑๑๑๑๑๑๑๑|ดุท้่เึางืผิดุท้่เึางื|𐎑⃢𝘼𝙩𝙩𝙖𝙘𝙠|۩꦳|ผิดุท้เึางื)/gi) || m.text.length >= 15000)) {
    conn.groupRemove(m.chat, [m.sender], m).then(() => {
      conn.reply(m.chat, `\n`.repeat(100), m).then(() => {
        conn.reply(m.chat, `*Ada virtex, tanda telah dibaca dulu.*\n*Jangan lupa bersihkan chat.*`)
      })
    })
  }
}
module.exports = handler