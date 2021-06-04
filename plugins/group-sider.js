let { MessageType, Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text, participants }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	var lama = 86400000 * 10
	let member = participants.map(u => u.jid)
	if(!text) {
		var pesan = "Harap aktif di grup karena akan ada pembersihan member setiap saat"
	} else {
		var pesan = text
	}
	sum = member.length
	var total = 0
	var sider = []
	for(let i = 0; i < sum; i++) {
		let users = m.isGroup ? participants.find(u => u.jid == member[i]) : {}
		if((typeof global.DATABASE.data.users[member[i]] == 'undefined' || new Date() * 1 - global.DATABASE.data.users[member[i]].lastseen > lama) && !users.isAdmin && !users.isSuperAdmin) { 
			if (typeof global.DATABASE.data.users[member[i]] !== 'undefined'){
				if(global.DATABASE.data.users[member[i]].whitelist == false){
					total++
					sider.push(member[i])
				}
			}else {
				total++
				sider.push(member[i])
			}
		}
	}
	if(total == 0) return conn.reply(m.chat, `*Digrup ini tidak terdapat sider.*`, m)
	conn.reply(m.chat, `*${total}/${sum}* anggota grup *${conn.getName(m.chat)}* adalah sider dengan alasan :\n1. Tidak aktif selama lebih dari 10 hari\n2. Baru join tetapi tidak pernah nimbrung\n\n_“${pesan}”_\n\n*LIST SIDER :*\n${sider.map(v => '  ○ @' + v.replace(/@.+/, '' + typeof global.DATABASE.data.users[v] == "undefined" ? ' join doang' : ' off ' + msToDate(new Date()*1 - global.DATABASE.data.users[v].lastseen))).join('\n')}`, m,{ contextInfo: { mentionedJid: sider } })
}
handler.help = ['sider']
handler.tags = ['group', 'group admin']
handler.command = /^(sider)$/i
handler.group = true
handler.botAdmin = true
handler.fail = null
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function msToDate(ms) {
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
		return days+"H "+hours+"J";
	}
	// +minutes+":"+sec;
}