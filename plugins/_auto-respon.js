let fs = require('fs')
let handler = m => m
handler.before = async (m, { conn, isMods }) => {
	if (m.text.toLowerCase() == "y" && isMods) {
    ran = "./media/desah-bangsat.mp3"
    buffer = fs.readFileSync(ran)
    const option = {
      quoted: m,
      mimetype: 'audio/mp4',
      ptt: true
    }
    conn.voice(m.chat, buffer, option)
  }
}
module.exports = handler