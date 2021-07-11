// let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, text }) => {
	function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }

  text = no(text)
	
  let pp = './src/avatar_contact.png'
  if(isNaN(text)) {
		var number = text.split`@`[1]
	}else if(!isNaN(text)) {
		var number = text
	}

	function msToDate(ms) {
		temp = ms
		days = Math.floor(ms / (24*60*60*1000));
		daysms = ms % (24*60*60*1000);
		hours = Math.floor((daysms)/(60*60*1000));
		hoursms = ms % (60*60*1000);
		minutes = Math.floor((hoursms)/(60*1000));
		minutesms = ms % (60*1000);
		sec = Math.floor((minutesms)/(1000));
		return days+"H "+hours+"J "+ minutes + "M";
		// +minutes+":"+sec;
  }
	function msToDate2(ms) {
		temp = ms
		days = Math.floor(ms / (24*60*60*1000));
		daysms = ms % (24*60*60*1000);
		hours = Math.floor((daysms)/(60*60*1000));
		hoursms = ms % (60*60*1000);
		minutes = Math.floor((hoursms)/(60*1000));
		minutesms = ms % (60*1000);
		sec = Math.floor((minutesms)/(1000));
		if (days == 0 && hours == 0 && minutes == 0){
			return "Baru Saja"
		}else {
			return days+"H "+hours+"J " + minutes + "M";
		}
		// +minutes+":"+sec;
  }
	
	if(typeof global.DATABASE.data.users[number + '@s.whatsapp.net'] == 'undefined') return m.reply(`*Nomor "${text}" tidak terdaftar di bot.*`)
  try {
		if (!text && !m.quoted){
			user = m.sender
		}else if(text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		var user = number + '@s.whatsapp.net'
		}
		pp = await conn.getProfilePicture(user)
	} catch (e) {
	} finally {
		if(typeof global.DATABASE.data.users[user] !== 'undefined'){
			var money = global.DATABASE.data.users[user].money
			var xp = global.DATABASE.data.users[user].xp
			var limit = global.DATABASE.data.users[user].limit
			var warn = global.DATABASE.data.users[user].warning
			var chat = global.DATABASE.data.users[user].chat
			if(global.DATABASE._data.users[user].isBanned == true) {
				var banned = '✅'
			} else {
				var banned = '❎'
			}

			now = new Date() * 1
			if(global.DATABASE._data.users[user].premium == true) {
				var premium = msToDate(global.DATABASE._data.users[user].premiumDate - now)
			} else {
				var premium = '❎'
			}

			var lastseen = msToDate2(now - global.DATABASE.data.users[user].lastseen)
			var usebot = msToDate2(now - global.DATABASE.data.users[user].usebot)
			let about = (await conn.getStatus(user)).status
			let pasangan

			if (global.DATABASE.data.users[user].pasangan == "" || typeof global.DATABASE.data.users[global.DATABASE.data.users[user].pasangan] == "undefined") {
				pasangan = "Jomblo"
			}else if (global.DATABASE.data.users[global.DATABASE.data.users[user].pasangan].pasangan != user){
				pasangan = "Digantung"
			}else {
				pasangan = "Berpacaran"
			}
			
			var nomor = user.split`@`[0]
			var isName = conn.getName(user)
			if (typeof isName !== 'undefined') {
				var name = isName
			} else {
				var name = '(Tanpa Nama)'
			} conn.sendFile(m.chat, pp, 'profile.jpg', `*❏ PROFILE USER*

*Nama* : ${name}
*Tentang*  : ${about}
*Nomor* : ${nomor}
*Level* : ${conn.level(xp)[0].toLocaleString()} (${xp.toLocaleString()} / ${conn.level(xp)[1].toLocaleString()})
*Uang* : Rp. ${Number(money).toLocaleString().replace(/,/g, '.')},-
*Limit* : ${limit.toLocaleString()}
*Pasangan* : ${pasangan}
*Premium* : ${premium}
*Warning* : ${warn} / 5
*Banned* : ${banned}
*Use Bot* : ${usebot}
*Last Seen* : ${lastseen}`, m)
			
		}else{
			m.reply(`*Nomor ${text} tidak terdaftar di bot.*`)
		}
	}
}
handler.help = ['*@tag*','*(reply)*'].map(v => 'profile ' + v)
handler.tags = ['group tools','tools']
handler.command = /^(profile|profil)$/i
handler.exp = 0
handler.limit = false
module.exports = handler