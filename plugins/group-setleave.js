let handler = async (m, { conn, text }) => {
  if (text) {
		global.DATABASE._data.chats[m.chat].sBye = text
    conn.reply(m.chat, `*Leave Message berhasil di set.*\n\n@user = Nama User\n@subject = Nama Grup`, m)
	} else throw `*Masukkan teks untuk dijadikan Leave Message.*`
}
handler.help = ['setleave *text*']
handler.tags = ['group admin']
handler.command = /^setleave$/i
handler.admin = true
handler.botAdmin = true
handler.group = true
module.exports = handler

