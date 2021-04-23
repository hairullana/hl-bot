let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
	conn.updatePresence(m.chat, Presence.composing) 
	let pp = './src/avatar_contact.png'
  try {
	pp = await conn.getProfilePicture(m.chat)
		} catch (e) {
	} finally {
	
		let welcome = global.DATABASE.data.chats[m.chat].welcome
		let left = global.DATABASE.data.chats[m.chat].left
		let filter = global.DATABASE.data.chats[m.chat].warningGroup
		let nolink = global.DATABASE.data.chats[m.chat].nolink
		let novirtex = global.DATABASE.data.chats[m.chat].novirtex
		let adminMode = global.DATABASE.data.chats[m.chat].adminMode
    
	var name = conn.getName(m.chat)
	function msToDate(ms) {
		temp = ms
		days = Math.floor(ms / (24*60*60*1000));
		daysms = ms % (24*60*60*1000);
		hours = Math.floor((daysms)/(60*60*1000));
		hoursms = ms % (60*60*1000);
		minutes = Math.floor((hoursms)/(60*1000));
		minutesms = ms % (60*1000);
		sec = Math.floor((minutesms)/(1000));
		if (temp < 0){
			return "Forever"
		}else {
			return days+" Hari "+hours+" Jam "+ minutes + " Menit";
		}
		// +minutes+":"+sec;
  }

	conn.sendFile(m.chat, pp, 'profile.jpg', `*[ ${ucword(name)} ]*\n\n  - Expired : ${msToDate(global.DATABASE.data.chats[m.chat].expired - new Date())}\n  - Admin Mode : ${data(adminMode)}\n  - Anti-Link : ${data(nolink)}\n  - Anti-Virtex : ${data(novirtex)}\n  - Anti-Badword : ${data(filter)}\n  - Welcome Msg : ${data(welcome)}\n  - Leave Msg : ${data(left)}`, m)
	}
}
handler.help = ['groupinfo']
handler.tags = ['group admin','group tools']
handler.command = /^(groupinfo)$/i
handler.exp = 1000
handler.group = true
module.exports = handler

function ucword(str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}

function data(str){
	if (ucword(str) == "False"){
		return "Tidak Aktif"
	}else {
		return "Aktif"
	}
}