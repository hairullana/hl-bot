let handler  = async (m, { conn }) => {
  let pp = './src/avatar_contact.png'
	pp = await conn.getProfilePicture(global.conn.user.jid)
  conn.sendFile(m.chat, pp, 'profile.jpg',`*BOT HL GANS*\n\n\nBot ini dibuat menggunakan *NodeJS* dengan bantuan *Baileys* sebagai Whatsapp Web API dan dimodifikasi dari *Wabot-aq* dengan penuh cinta oleh Abang Ganteng *Hairul Lana* sehingga membuat botnya semakin tampan\n\nSilahkan ketik _.menu_ untuk melihat menu bot dan jangan lupa di baca ya, biar ga tolol !`, m)
}
handler.help = ['info (info bot)']
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