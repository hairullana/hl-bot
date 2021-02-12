// let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, text }) => {
  let pp = './src/avatar_contact.png'
  if(isNaN(text) && !text.match(/@/g) && !m.quoted){
		return conn.reply(m.chat, `*Penggunaan yang benar*\n\n.profile @user\n.profile -> reply chat`, m)
	}else if(isNaN(text)) {
		var number = text.split`@`[1]
	}else if(!isNaN(text)) {
		var number = text
	}
	
	if(!text && !m.quoted) return conn.reply(m.chat, `*Penggunaan yang benar*\n\n.profile @user\n.profile -> reply chat`, m)
	if(number.length > 15 || (number.length < 9 && number.length > 0)) return conn.reply(m.chat, `*Masukin nomor yg bener gblk !*`, m)
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
		// format mata uang
		const format = num => {
			const n = String(num),
						p = n.indexOf('.')
			return n.replace(
					/\d(?=(?:\d{3})+(?:\.|$))/g,
					(m, i) => p < 0 || i < p ? `${m},` : m
			)
		}

		// function inArray(needle, haystack) {
		// 	var length = haystack.length;
		// 	for(var i = 0; i < length; i++) {
		// 			if(haystack[i] == needle) return true;
		// 	}
		// 	return false;
		// }	

		// conn.reply(m.chat, `${global.DATABASE.data.users["6283119526456@s.whatsapp.net"]}`, m)

		if(typeof global.DATABASE.data.users[user] !== 'undefined'){
			var money = global.DATABASE.data.users[user].exp
			var limit = global.DATABASE.data.users[user].limit
			if(global.DATABASE._data.users[user].isBanned == true) {
				var banned = 'TerBANNED'
			} else {
				var banned = 'Aman'
			}
		}else{
			var money = 0
			var limit = 0
			var banned = "Belum Terdaftar"
		}
		// let badword = global.DATABASE._data.users[user].warning
		let about = (await conn.getStatus(user)).status
		
		var nomor = user.split`@`[0]
		var isName = conn.getName(user)
		if (typeof isName !== 'undefined') {
			var name = isName
		} else {
			var name = '(Tanpa Nama)'
		} conn.sendFile(m.chat, pp, 'profile.jpg', `*IDENTITAS MEMBER*\n\n○ *Nama : ${name}*\n○ *Tentang : ${about}*\n○ *Nomor : ${nomor}*\n○ *Uang : Rp. ${Number(money).toLocaleString().replace(/,/g, '.')},-*\n○ *Limit : ${format(limit)}*\n○ *Banned : ${banned}*\n\n▌│█║▌║▌║║▌║▌║█│▌█║`, m)
	}
}
handler.help = ['*62xx*','*@user*','*(reply)*'].map(v => 'profile ' + v)
handler.tags = ['group']
handler.command = /^(profile|profil)$/i
handler.exp = 0
handler.limit = false
module.exports = handler