let fs = require('fs')
let handler = m => m
handler.before = async (m, { conn, isMods }) => {
  if (m.text.toLowerCase() == "y" && isMods) {
    ran = "./media/desah-bangsat.mp3"
    buffer = fs.readFileSync(ran)
    let option
    if (m.isGroup){
      let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
      option = {
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: { mentionedJid: users }
      }
    }else {
      option = {
        mimetype: 'audio/mp4',
        ptt: true
      }
    }
    conn.voice(m.chat, buffer, option)
  }
}
module.exports = handler