let handler  = async (m, { conn, participants }) => {
  let pp = './src/avatar_contact.png'
	pp = await conn.getProfilePicture(global.conn.user.jid)

  let users = m.isGroup ? participants.find(u => u.jid == m.sender) : {}

  const delay = time => new Promise(res=>setTimeout(res,time));

  conn.sendFile(m.chat, pp, 'profile.jpg',`*TUTORIAL MENGGUNAKAN BOT*

1. SPAM ? TELP/VC ? Auto Banned ! Bot menanggapi perintah setiap 7 detik, jadi SANTAY GAN

2. Untuk melihat daftar command, silahkan ketik *.menu*

3. Bot tidak selalu aktif, jika bot tidak merespon artinya bot sedang offline

4. Beberapa fitur menggunakan *limit*, silahkan membeli limit menggunakan command *.buy _total_* menggunakan uang bot

5. Uang bisa didapatkan dengan menggunakan fitur bot atau dengan bermain game (lihat menu game)

6. Untuk upgrade premium ketik *.infopremium* & untuk sewa bot ketik *.join*

7. Silahkan hubungi owner ( *.owner* ) jika ada fitur error, unbanned, upgrade premium, atau ingin sewa bot

8.  Beberapa command membutuhkan argumen seperti berikut :
   - *total* : jumlah dengan angka (misal _.buy 5_)
   - *text* : teks biasa (misal _.ttp whatsapp_)
   - *@user* : tag member grup (misal _.kick @bayu_)
   - *(reply)* : gunakan command dengan membalas salah satu pesan
   - *(caption)* : gunakan command dengan menyertakan gambar
   - *query* : kata kunci (misal _.yt rap music_)
   - *expression* : ekspresi / soal matematika (misal _.calc 2+2_)
   - *62xx* : nomor diawali dengan kode negara
   - *url* : alamat situs web (misal _.ss https://google.com_)
   - *question* : pertanyaan (misal _.kapan kiamat ?_)
   - *on/off* : pilih salah satu (misal _.antilink on_)
   - *open/close* : pilih salah satu (misal _.group close_)
`, m)

  await delay(2500)

  if (users.isAdmin || users.isSuperAdmin) conn.sendFile(m.chat, pp, 'profile.jpg', `*TUTORIAL UNTUK ADMIN GC*

1. Silahkan lihat menu khusus admin di bagian *ADMIN GROUP* (ketik .menu)

2. Baca kembali menu dan silahkan dicoba-coba saja (terutama untuk fitur welcome dan leave / UCAPAN OTOMATIS)

3. Perhatikan kembali untuk fitur dibawah ini :
    .sider (member yang tidak aktif selama lebih dari 10 hari)
    .sampah (member yang tidak pernah muncul sejak pertama kali join)
    .tai (member yang dibanned oleh bot)
    .antiasing (kick member dengan nomor selain +62)

*(+) Hati hati dalam menggunakan _.kicksider_ dan _.kicksampah_ karena butuh beberapa hari agar bot dapat mengenali sider/sampah !*
`,m)
}
handler.help = ['help (tutorial bot)']
handler.tags = ['info']
handler.command = /^(help)$/i
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