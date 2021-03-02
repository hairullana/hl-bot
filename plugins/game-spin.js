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
		conn.reply(m.chat, `*Tidak bisa melakukan spin dengan nominal dibawah Rp. 10.000,-*`, m)
	} else {
		global.DATABASE._data.users[m.sender].exp -= args[0]
		await conn.updatePresence(m.chat, Presence.composing) 
		// conn.reply(m.chat, `*Spining! Please wait 10s . . .*`, m)
		setTimeout(() => {
			var reward = getRandom(1,2*args[0])
			global.DATABASE._data.users[m.sender].exp += reward  
			let last = global.DATABASE._data.users[m.sender].exp
			let total = last
			conn.updatePresence(m.chat, Presence.composing) 
			conn.reply(m.chat, `*[ SPIN RESULT ]*\n\n	- *Rp. ${Number(args[0]).toLocaleString().replace(/,/g, '.')}*\n	+ *Rp. ${Number(reward).toLocaleString().replace(/,/g, '.')}*\n\n*Total : Rp. ${Number(total).toLocaleString().replace(/,/g, '.')},-*\n\n*NB* : “Bot memiliki spam detector, harap tidak spam atau anda akan di kick / banned”`, m)  
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