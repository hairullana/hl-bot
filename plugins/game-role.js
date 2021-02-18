let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args }) => {
	let money = global.DATABASE._data.users[m.sender].exp
	if(!args || !args[0] || args[0] == 0) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Masukkan nominal / jumlah uang untuk di role.*`, m)
	} else if(isNaN(args[0])) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Uang harus berupa angka & tanpa [ . ].*`, m)
	} else if(args[0] > money) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Uang anda tidak cukup untuk melakukan role sebanyak Rp. ${Number(args[0]).toLocaleString().replace(/,/g, '.')},-*`, m)
	} else if(money == 0) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Kamu tidak punya uang untuk bermain permainan role.*`, m)
	} else if(args[0] < 10000) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Tidak bisa melakukan role dengan nominal dibawah Rp. 10.000,-*`, m)
	} else {
		global.DATABASE._data.users[m.sender].exp -= args[0]
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Rolling! Please wait 7s . . .*`, m)
		setTimeout(() => {
			var reward = ranDom([5, 10, 25, 27, 30, 35, 70, 72, 80, 81, 87, 90, 95, 98, 100, 150, 178, 284, 301, 355, 360, 371, 389, 400, 450, 480, 500, 1000, 4899, 7039, 9483, 10488, 83748, 96163, 100800, 274889, 50000, 55000, 180000, 185000, 255000, 374967, 457000, 587990, 578996, 657488, 729000, 878000, 952000, 1590000])
			conn.updatePresence(m.chat, Presence.composing) 
			conn.reply(m.chat, `*⺀ RESULT ⺀*\n\n	*-  Rp. ${Number(args[0]).toLocaleString().replace(/,/g, '.')}*\n	*+  Rp. ${Number(reward).toLocaleString().replace(/,/g, '.')}*`, m)  
			global.DATABASE._data.users[m.sender].exp += reward     
    	}, 700)
	} 
}
handler.help = ['rolling','spin'].map(v => v + " *total*")
handler.tags = ['game']
// handler.command = /^(rolling|spin)$/i
handler.owner = false
handler.group = true
handler.limit = true
handler.exp = 0
module.exports = handler

function ranDom(list) {
  return list[Math.floor(Math.random() * list.length)]
}