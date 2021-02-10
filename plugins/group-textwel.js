let handler = async (m, { conn, text }) => {
  if (text) {
		global.DATABASE._data.chats[m.chat].sWelcome = text
    	conn.reply(m.chat, `*Welcome Message berhasil di set.*`, m)
	} else throw `*Masukkan teks untuk dijadikan Welcome Message.*`
}
handler.help = ['setbye <teks>']
handler.tags = ['owner', 'group']
handler.command = /^textwel$/i
handler.admin = true
handler.botAdmin = true
handler.group = true
module.exports = handler

