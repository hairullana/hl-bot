let handler  = async (m, { conn }) => {
  let pp = './src/avatar_contact.png'
	pp = await conn.getProfilePicture(global.conn.user.jid)
  conn.sendFile(m.chat, pp, 'profile.jpg',`*Syarat dan Ketentuan BOT HL GANS*\n\n1. Jangan SPAM ! Auto banned / kick otomatis\n2. Jangan Telp/VC Bot\n3. Invite Bot ke grup GAK GRATIS\n4. Ada masalah hubungi owner (ketik .owner)\n5. Pokoknya klo owner terganggu/risih, lu di banned ajg`, m)
}
handler.help = ['snk','rules']
handler.tags = ['info']
handler.command = /^(snk|rules)$/i
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