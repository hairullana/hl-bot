let handler = async (m, { conn, text }) => {
  if (text) {
		global.DATABASE._data.chats[m.chat].sWelcome = text
    conn.reply(m.chat, `*Welcome Message berhasil di set.*\n\n@user = Nama User\n@group = Nama Grup\n@desc = Deskripsi Grup`, m)
	} else throw `*Masukkan teks untuk dijadikan Welcome Message.*`
}
handler.help = ['setwelcome *text*']
handler.tags = ['group admin']
handler.command = /^setwelcome$/i
handler.admin = true
handler.botAdmin = true
handler.group = true
module.exports = handler

