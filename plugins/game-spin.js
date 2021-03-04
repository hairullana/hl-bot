let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args }) => {
	let money = global.DATABASE._data.users[m.sender].exp
	if(!args || !args[0] || args[0] == 0) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Masukkan nominal / jumlah uang untuk di spin.*`, m)
	} else if(isNaN(args[0])) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Uang harus berupa angka & tanpa [ . ].*`, m)
	} else if(args[0] > money) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Uang anda tidak cukup untuk melakukan spin sebanyak Rp. ${Number(args[0]).toLocaleString().replace(/,/g, '.')},-*`, m)
	} else if(money == 0) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Kamu tidak punya uang untuk bermain permainan spin.*`, m)
	} else if(args[0] < 10000) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Tidak bisa melakukan spin dengan nominal di bawah Rp. 10.000,-*`, m)
	}else {
		global.DATABASE._data.users[m.sender].exp -= args[0]
		await conn.updatePresence(m.chat, Presence.composing) 
		// conn.reply(m.chat, `*Spining! Please wait 10s . . .*`, m)
		setTimeout(() => {
			var maxReward = 3
			if (money > 1000000000){
				var reward = getRandom(1,0.25*args[0])
			}else if (money > 500000000){
				var reward = getRandom(1,0.5*args[0])
			}else if (money > 150000000){
				var reward = getRandom(1,1*args[0])
			}else if (money > 50000000){
				var reward = getRandom(1,1.5*args[0])
			}else if (money > 25000000){
				var reward = getRandom(1,2*args[0])
			}else{
				var reward = getRandom(1,maxReward*args[0])
			}
			
			global.DATABASE._data.users[m.sender].exp += reward  
			let last = global.DATABASE._data.users[m.sender].exp
			let total = last
			conn.updatePresence(m.chat, Presence.composing) 
			conn.reply(m.chat, `*[ SPIN RESULT ]*\n\n	- *Rp. ${Number(args[0]).toLocaleString().replace(/,/g, '.')}*\n	+ *Rp. ${Number(reward).toLocaleString().replace(/,/g, '.')}*\n\n*Total : Rp. ${Number(total).toLocaleString().replace(/,/g, '.')},-*\n\n*NB* : “Rentang hadiah adalah Rp. 1 sampai ${maxReward}x lipat modal dengan pengurangan 1 limit setiap kali penggunaan”`, m)  
    	}, 1000)
	} 
}
handler.help = ['spin *money*','judi *money*']
handler.tags = ['game']
handler.command = /^(spin|judi)$/i
handler.owner = false
handler.group = false
handler.limit = true

handler.exp = 0
module.exports = handler

function getRandom(min,max){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random()*(max-min+1)) + min
}