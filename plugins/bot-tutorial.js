let handler  = async (m, { conn }) => {
  let pp = './src/avatar_contact.png'
	pp = await conn.getProfilePicture(global.conn.user.jid)
  conn.sendFile(m.chat, pp, 'profile.jpg',`*TUTORIAL MENGGUNAKAN BOT*\n\n1. Untuk melihat daftar command, silahkan ketik *.menu*\n\n2. Bot tidak selalu aktif, jika bot tidak merespon artinya bot sedang offline\n\n3. Beberapa fitur menggunakan *limit*, silahkan membeli limit menggunakan command *.buy _total_* menggunakan uang bot\n\n4. Uang bisa didapatkan dengan menggunakan fitur bot atau dengan mengerjakan soal matematika (ketik *.math*)\n\n5. Jika anda menemukan bug / error bot, laporkan ke owner dengan menggunakan command *.bug* (Laporan palsu/main-main = banned)\n\n6.  Beberapa command membutuhkan argumen seperti berikut :\n   - *total* : jumlah dengan angka (misal _.buy 5_)\n   - *text* : teks biasa (misal _.ttp whatsapp_)\n   - *@user* : tag member grup (misal _.kick @bayu_)\n   - *(reply)* : gunakan command dengan membalas salah satu pesan\n   - *(caption)* : gunakan command dengan menyertakan gambar\n   - *query* : kata kunci (misal _.yt rap music_)\n   - *expression* : ekspresi / soal matematika (misal _.calc 2+2_)\n   - *62xx* : nomor diawali dengan kode negara\n   - *url* : alamat situs web (misal _.ss https://google.com_)\n   - *question* : pertanyaan (misal _.kapan kiamat ?_)\n   - *on/off* : pilih salah satu (misal _.antilink on_)\n   - *open/close* : pilih salah satu (misal _.group close_)`, m)
}
handler.help = ['tutorial (tutorial bot)']
handler.tags = ['info']
handler.command = /^(tutorial|tutor)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.exp = 250
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler