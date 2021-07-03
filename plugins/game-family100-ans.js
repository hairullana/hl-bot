const { MessageType } = require('@adiwajshing/baileys')
const fs = require('fs')
let handler = m => m
handler.before = async function (m) {
    id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Quiz :/i.test(m.quoted.text)) return !0
    conn.quiz = conn.quiz ? conn.quiz : {}
	prefix = hl
    if (!(id in conn.quiz)) return m.reply(`Silahkan kirim ${prefix}quiz untuk mendapatkan soal baru.`)
    if (m.quoted.id == conn.quiz[id][0].id) {
        let json = JSON.parse(JSON.stringify(conn.quiz[id][1]))
		const x = m.text.toLowerCase().trim()
		if((conn.quiz[id][4]).includes(x)) return m.reply(`"${x}" sudah terjawab silahkan cari jawaban lain!`)
        if (json.jawaban.includes(x)) {
			reward = rwd(500000, 2000000)
			global.DATABASE.data.users[m.sender].exp += reward
			conn.quiz[id][4].push(x)
			conn.quiz[id][5].push(m.sender)
			conn.quiz[id][6].push(reward)
     	   v = conn.quiz[id][4]
			y = conn.quiz[id][5]
			r = conn.quiz[id][6]
			z = []
				for(let i=0; i<y.length; i++) {
					z.push({ sender: y[i].split('@')[0], jawaban: v[i], reward: r[i] })
				}
			e = '❏  A N S W E R I N G\n\n'
				for(let i=0; i<z.length; i++) {
					e += ' › @' + z[i].sender + ' : ' + z[i].jawaban + ' (+ Rp. ' + Number(z[i].reward).toLocaleString().replace(/,/gi, '.') + ',-)\n'
				}
		conn.rbc(m.chat, `${e}\n${global.footer}`, global.headtext, y).then(() => {
		// m.reply(`+ Rp. ${Number(reward).toLocaleString().replace(/,/gi, '.')},-`)
		if(v.length == json.jawaban.length) {
		    m.reply(`Quiz selesai!\n*Silahkan kirim ${prefix}quiz untuk mendapatkan soal baru.*`)
			clearTimeout(conn.quiz[id][3])
			delete conn.quiz[id]
				}
			})
		} else {
			sender_money = global.DATABASE.data.users[m.sender].exp 
        	zonk = rwd(500000, 1000000)
        	if(sender_money < zonk) {
        		sender_money = 0
       	  } else {
 			   sender_money -= zonk
			} m.reply(`- Rp. ${Number(zonk).toLocaleString().replace(/,/gi, '.')},-`)
		}
    }
    return !0
}
handler.exp = 0
module.exports = handler

function rwd(min, max) {  
    min = Math.ceil(min) 
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}  
/*
	if (m.text.toLowerCase().endsWith(json.jawaban.split` `[1])) m.reply(`Dikit Lagi!`)
	else if (m.text.toLowerCase().startsWith(json.jawaban.split` `[0])) m.reply(`Dikit Lagi!`)
*/