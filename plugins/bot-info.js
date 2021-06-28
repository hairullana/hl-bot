let handler  = async (m, { conn }) => {
  let pp = './src/avatar_contact.png'
	pp = await conn.getProfilePicture(global.conn.user.jid)
  conn.sendFile(m.chat, pp, 'profile.jpg',`*❏ HL BOT*

Bot ini dibuat menggunakan *NodeJS* dengan bantuan *Baileys* sebagai Whatsapp Web API dan dimodifikasi dari *Wabot-aq (Nurutomo)* dengan penuh cinta oleh Abang Ganteng *H.L.* sehingga membuat botnya semakin tampan.

*❏ INFO BOT*
IG: https://instagram.com/loadingtomastah
Tele: https://t.me/loadingtomastah`, m)
}
handler.help = ['info']
handler.tags = ['info']
handler.command = /^(info)$/i
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