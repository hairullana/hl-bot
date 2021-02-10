// let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, text }) => {
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let pp = './src/avatar_contact.png'
  if(isNaN(text)) {
  	var number = text.split`@`[1]
  } else if(!isNaN(text)) {
  	var number = text
  }
  if(!text && !m.quoted) return conn.reply(m.chat, `*Masukkan nomor, reply atau tag target.*`, m)
  if(number.length > 15) return conn.reply(m.chat, `*Format tidak valid.*`, m)
  try {
		if(text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var user = number + '@s.whatsapp.net'
		} pp = await conn.getProfilePicture(user)
	} catch (e) {
} finally {
	let money = global.DATABASE.data.users[user].exp
	let limit = global.DATABASE.data.users[user].limit
	// let badword = global.DATABASE._data.users[user].warning
	let about = (await conn.getStatus(who)).status
    
	if(global.DATABASE._data.users[user].isBanned == true) {
		var banned = 'TerBANNED'
	} else {
		var banned = 'Aman'
	}
	
	var nomor = user.split`@`[0]
	var isName = conn.getName(user)
		if (typeof isName !== 'undefined') {
			var name = isName
		} else {
			var name = '(Tanpa Nama)'
		} conn.sendFile(m.chat, pp, 'profile.jpg', `*IDENTITAS ANAK KNTL*\n\n	○ *Nama : ${name}*\n	○ *Tentang : ${about}*\n	○ *Nomor : ${number}*\n	○ *Uang : Rp. ${Number(money).toLocaleString().replace(/,/g, '.')},-*\n	○ *Limit : ${limit}*\n	○ *Banned : ${banned}*\n\n▌│█║▌║▌║║▌║▌║█│▌█║`, m)
	}
}
handler.help = ['profile']
handler.tags = ['group']
handler.command = /^(profile|profil)$/i
handler.exp = 0
handler.limit = false
module.exports = handler