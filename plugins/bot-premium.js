let handler  = async (m, { conn }) => {
  let pp = './src/avatar_contact.png'
	pp = await conn.getProfilePicture(global.conn.user.jid)
  conn.sendFile(m.chat, pp, 'profile.jpg',`*[ INFO USER PREMIUM ]*\n\nDengan mendaftar menjadi user premium anda akan mendapatkan keuntungan sebagai berikut :\n\n1. Bisa menggunakan fitur premium\n2. Limit tak terbatas (tidak berkurang sama sekali)\n3. Bisa menggunakan bot melalui personal chat\n\nSilahkan hubungi owner ( *.owner* ) untuk melakukan upgrade premium hanya dengan Rp. 5.000 per bulan`, m)
}
handler.help = ['infopremium']
handler.tags = ['info']
handler.command = /^(infopremium|infoprem)$/i
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