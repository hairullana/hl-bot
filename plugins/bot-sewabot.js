let handler = async (m, { conn }) => {
  let pp = './src/avatar_contact.png'
	pp = await conn.getProfilePicture(global.conn.user.jid)
  conn.sendFile(m.chat, pp, 'profile.jpg',`*[ SEWA BOT ]*\n\nSilahkan hubungi owner ( *.owner* ) jika ingin menyewa bot untuk grup chat kalian dengan biaya Rp. 10.000 + Premium selama 1 bulan\n\nUntuk upgrade premium hanya Rp. 5.000 per bulan`, m)
}
handler.help = ['infosewa','join','sewabot']
handler.tags = ['info']
handler.command = /^infosewa|join|sewabot$/i

module.exports = handler
