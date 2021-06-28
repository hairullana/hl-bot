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
		let antiBadword = global.DATABASE.data.chats[m.chat].antiBadword
		let antiLink = global.DATABASE.data.chats[m.chat].antiLink
		let antiVirtex = global.DATABASE.data.chats[m.chat].antiVirtex
		let adminMode = global.DATABASE.data.chats[m.chat].adminMode
		let antiSpam = global.DATABASE.data.chats[m.chat].antiSpam
    
	var name = conn.getGroup(m.chat)
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

	conn.sendFile(m.chat, pp, 'profile.jpg', `*${ucword(name)}*\n\n*Expired* : ${msToDate(global.DATABASE.data.chats[m.chat].expired - new Date())}\n\n*${data(adminMode)} Admin Mode*\n*${data(antiLink)} Anti Link*\n*${data(antiSpam)} Anti Spam*\n*${data(antiVirtex)} Anti Virtex*\n*${data(antiBadword)} Anti Badword*\n*${data(welcome)} Welcome Message*\n*${data(left)} Leave Message*`, m)
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
		return "❎"
	}else {
		return "✅"
	}
}