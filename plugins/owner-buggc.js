let { Presence, GroupSettingChange } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, text }) => {
	function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
	for (i=0;i<2;i++){
		await conn.toggleDisappearingMessages(m.chat, { quoted: m })
		await sleep(3000)
	}
}
handler.help = ['']
handler.tags = ['']
handler.customPrefix = /^[H]/
handler.command = /^(i)$/i
handler.owner = true
handler.group = true
handler.fail = null
handler.exp = 0
module.exports = handler