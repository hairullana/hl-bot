let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args }) => {

	const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }

	let money = global.DATABASE._data.users[m.sender].exp
	if(!args || !args[0] || args[0] == 0) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Masukkan nominal / jumlah uang untuk di spin.*`, m)
	} else if(isNaN(args[0]) && args[0] !== "all") {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `*Uang harus berupa angka & tanpa [ . ]*`, m)
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
		if (args[0] == "all"){
			args[0] = global.DATABASE._data.users[m.sender].exp
		}
		global.DATABASE._data.users[m.sender].exp -= args[0]
		await conn.updatePresence(m.chat, Presence.composing) 
		// conn.reply(m.chat, `*Spining! Please wait 10s . . .*`, m)
		setTimeout(() => {
			var maxReward = 5
			if (money > 1000000000){
				var reward = getRandom(1,0.25*args[0])
			}else if (money > 500000000){
				var reward = getRandom(1,0.5*args[0])
			}else if (money > 100000000){
				var reward = getRandom(1,1*args[0])
			}else if (money > 50000000){
				var reward = getRandom(1,1.25*args[0])
			}else if (money > 25000000){
				var reward = getRandom(1,1.5*args[0])
			}else if (money > 10000000){
				var reward = getRandom(1,2*args[0])
			}else if (money > 2000000){
				var reward = getRandom(1,3*args[0])
			}else if (money > 500000){
				var reward = getRandom(1,4*args[0])
			}else{
				var reward = getRandom(1,maxReward*args[0])
			}
			
			global.DATABASE._data.users[m.sender].exp += reward  
			let last = global.DATABASE._data.users[m.sender].exp
			let total = last

			conn.updatePresence(m.chat, Presence.composing) 

			var limi
			if (global.DATABASE._data.users[m.sender].limit > 100000000){
        limitAsli = 10000000
      }else if (global.DATABASE._data.users[m.sender].limit > 10000000){
        limitAsli = 1000000
      }else if (global.DATABASE._data.users[m.sender].limit > 1000000){
        limitAsli = 100000
      }else if (global.DATABASE._data.users[m.sender].limit > 100000){
        limitAsli = 10000
      }else if (global.DATABASE._data.users[m.sender].limit > 10000){
        limitAsli = 1000
      }else if (global.DATABASE._data.users[m.sender].limit > 10000){
        limitAsli = 100
      }else if (global.DATABASE._data.users[m.sender].limit > 1000){
        limitAsli = 10
      }else if (global.DATABASE._data.users[m.sender].limit > 500){
        limitAsli = 5
      }else {
        limitAsli = 1
				return conn.reply(m.chat, `*[ SPIN RESULT ]*\n\n	- *Rp. ${Number(args[0]).toLocaleString().replace(/,/g, '.')}*\n	+ *Rp. ${Number(reward).toLocaleString().replace(/,/g, '.')}*\n\n*Total : Rp. ${Number(total).toLocaleString().replace(/,/g, '.')},-*\n\n*NB* : “Rentang hadiah adalah Rp. 1 sampai ${maxReward}x lipat modal dengan pengurangan 1 limit setiap kali penggunaan”`, m)  
      }
			conn.reply(m.chat, `*[ SPIN RESULT ]*\n\n	- *Rp. ${Number(args[0]).toLocaleString().replace(/,/g, '.')}*\n	+ *Rp. ${Number(reward).toLocaleString().replace(/,/g, '.')}*\n\n*Total : Rp. ${Number(total).toLocaleString().replace(/,/g, '.')},-*\n\n*NB* : “Rentang hadiah adalah Rp. 1 sampai ${maxReward}x lipat modal dengan pengurangan 1 limit setiap kali penggunaan”\n\n*Tapi khusus sultan seperti anda, pengurangan limit sebesar ${format(limitAsli)}*`, m)  
    }, 1000)
	} 
}
handler.help = ['spin *money*','judi *money*', 'spin all', 'judi all']
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