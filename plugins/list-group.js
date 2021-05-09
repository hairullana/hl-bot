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
			return "Forever"
		}else {
			return days+" Hari "+hours+" Jam "+ minutes + " Menit";
		}
		// +minutes+":"+sec;
  }

	var total = 0
  let txt = conn.chats.array.filter(v => v.jid.endsWith('g.us')).map(v =>`*${conn.getName(v.jid)}*\n${msToDate(global.DATABASE.data.chats[v.jid].expired - new Date())} [${v.read_only ? 'Left' : 'Joined'}]`).join`\n\n`

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
handler.limit = 2000
handler.fail = null

module.exports = handler