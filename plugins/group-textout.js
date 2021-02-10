let handler = async (m, { conn, text }) => {
  if (text) {
		global.DATABASE._data.chats[m.chat].sBye = text
    	conn.reply(m.chat, `*Leave Message berhasil di set.*`, m)
	} else throw `*Masukkan teks untuk dijadikan Leave Message.*`
}
handler.help = ['setbye <teks>']
handler.tags = ['owner', 'group']
handler.command = /^textout$/i
handler.admin = true
handler.botAdmin = true
handler.group = true
module.exports = handler

