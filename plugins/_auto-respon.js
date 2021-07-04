let fs = require('fs')
let handler = m => m
handler.before = async (m, { conn, isMods }) => {
  let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
	if (m.text.toLowerCase() == "y" && isMods) {
    ran = "./media/desah-bangsat.mp3"
    buffer = fs.readFileSync(ran)
    const option = {
      mimetype: 'audio/mp4',
      ptt: true,
      contextInfo: { mentionedJid: users }
    }
    conn.voice(m.chat, buffer, option)
  }
}
module.exports = handler