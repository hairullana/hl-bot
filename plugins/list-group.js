let handler = async (m, { conn }) => {
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
			return "Ilegal / Belum Set Expired"
		}else {
			return days+" Hari "+hours+" Jam "+ minutes + " Menit";
		}
		// +minutes+":"+sec;
  }

	function expired(gc){
		if (typeof global.DATABASE.data.chats[gc] != "undefined"){
			return msToDate(global.DATABASE.data.chats[gc].expired - new Date())
		}else {
			return "Tidak terdaftar di database"
		}
	}

	var total = 0
  let txt = conn.chats.array.filter(v => v.jid.endsWith('g.us')).map(v =>`*${conn.getName(v.jid)}*\n${v.jid}\n${expired(v.jid)} [${v.read_only ? 'Left' : 'Joined'}]`).join`\n\n`

  conn.chats.array.filter(v => v.jid.endsWith('g.us')).map(v => total+=1 )
  conn.reply(m.chat,`❏ Total Group : ${total}\n❏ Invite bot ke GC ? Ketik *.join*\n(hanya menerima jika total grup dibawah 25)\n\n` + txt, m)
}
handler.help = ['grouplist','grouplist']
handler.tags = ['group tools']
handler.command = /^(grouplist|listgroup)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.limit = true
handler.fail = null

module.exports = handler