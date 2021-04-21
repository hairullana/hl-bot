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
  let txt = conn.chats.array.filter(v => v.jid.endsWith('g.us')).map(v =>`${conn.getName(v.jid)}\n${msToDate(global.DATABASE.data.chats[v.jid].expired - new Date())} [${v.read_only ? 'Left' : 'Joined'}]`).join`\n\n`
  conn.reply(m.chat,txt, m)
}
handler.help = ['grouplist']
handler.tags = ['group tools']
handler.command = /^(grouplist|listgroup)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler