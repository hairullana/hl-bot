let handler = async (m, { conn }) => {
  let pp = './src/avatar_contact.png'
	pp = await conn.getProfilePicture(global.conn.user.jid)
  conn.sendFile(m.chat, pp, 'profile.jpg',`*❏ SEWA BOT*

Silahkan hubungi owner ( *.owner* ) jika ingin menyewa bot untuk grup chat kalian dengan biaya Rp. 10.000 per bulan

Untuk upgrade premium hanya Rp. 5.000 per bulan ( *.infopremium* )`, m)
}
handler.help = ['infosewa','sewabot']
handler.tags = ['info']
handler.command = /^infosewa|sewabot$/i

module.exports = handler
