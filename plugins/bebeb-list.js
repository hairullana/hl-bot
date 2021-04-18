let handler = async (m, { conn, participants, args }) => {
  let member = participants.map(u => u.jid)
  let kontol = {}
	var total = 0
  for (i=0;i<member.length;i++){
		if (typeof global.DATABASE.data.users[member[i]] != "undefined"){
			ayang = global.DATABASE.data.users[member[i]]
			bebeb = global.DATABASE.data.users[global.DATABASE.data.users[member[i]].pasangan]
			if (ayang.pasangan == bebeb && bebeb.pasangan == ayang){
				kontol[member[i]] = {
					pasangan: global.DATABASE.data.users[member[i]].pasangan,
					exp: global.DATABASE.data.users[member[i]].exp
				}
			}
			total += 1
		}
  }
	let sortedExp = Object.entries(kontol).sort((a, b) => b[1].exp - a[1].exp)
	let len = args[0] && args[0].length > 0 ? Math.min(1000, Math.max(parseInt(args[0]), 5)) : Math.min(10, sortedExp.length)

	let text = `
*[ LIST PASANGAN GROUP ]*\n

${sortedExp.slice(0, len).map(([user, data], i) => (i + 1) + '. '  + conn.getName(user) + ' 💓 ' + conn.getName(data.pasangan)).join`\n`}
    `.trim()
  
  conn.reply(m.chat, text, m)
}
// handler.help = ['listpacar']
handler.tags = ['gabut']
// handler.command = /^(listpacar)$/i
// handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
// handler.limit = true
// handler.admin = true
// handler.botAdmin = true
handler.fail = null
module.exports = handler