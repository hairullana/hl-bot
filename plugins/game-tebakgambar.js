let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
  anu = new Date()
  if (anu - global.DATABASE.data.waktuTebakGambar < 30){
    return conn.reply(m.chat,'Jawab dulu soal yang masih ada sat !',m)
  }
	fetch('https://videfikri.com/api/tebakgambar/')
		.then(res => res.json())
		.then(batch => {
			conn.updatePresence(m.chat, Presence.composing) 
			conn.sendFile(m.chat, batch.result.soal_gbr,'tebakgambar.jpg','Silahkan jawab sat !\n\nHadiah Rp. 50.000 jika benar\nWaktu 30 detik', m) 
      global.DATABASE._data.tebakGambar = batch.result.jawaban
      global.DATABASE.data.waktuTebakGambar = new Date()
	}) .catch(() => { conn.reply(m.chat, `*[ FITUR ERROR ]*\n\nMaaf fitur ${command} sedang tidak bisa digunakan.`, m) })
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^(tebakgambar)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = true
handler.exp = 500
module.exports = handler