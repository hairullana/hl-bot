let handler  = async (m, { conn, text }) => {
  function msToDate(ms) {
		temp = ms
		days = Math.floor(ms / (24*60*60*1000));
		daysms = ms % (24*60*60*1000);
		hours = Math.floor((daysms)/(60*60*1000));
		hoursms = ms % (60*60*1000);
		minutes = Math.floor((hoursms)/(60*1000));
		minutesms = ms % (60*1000);
		sec = Math.floor((minutesms)/(1000));
		return days+" Hari "+hours+" Jam "+ minutes + " Menit";
		// +minutes+":"+sec;
  }

	let users = global.DATABASE.data.users

  var text = ""
  var i = 1
  for (let jid in users){
    if (users[jid].whitelist){
      text += `\n${i}. ${conn.getName(jid)}\n    wa.me/${jid.split('@')[0]}`
      i += 1
    }
  }

  return conn.reply(m.chat,`❏ Total : ${i-1} user\n${text}`,m)
}
handler.help = ['listwhite','whitelist']
handler.tags = ['bot']
handler.command = /^(listwhite|whitelist)$/i
handler.exp = 2000
module.exports = handler