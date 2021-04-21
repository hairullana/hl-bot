let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, text, usedPrefix, command }) => {
	await conn.updatePresence(m.chat, Presence.composing)
  if (!text) return conn.reply(m.chat,`*[ JADWAL SHOLAT ERROR ]*\n\nSilahkan masukkan nama kota\nContoh : ${usedPrefix}${command} denpasar`)
	fetch('https://api.xteam.xyz/jadwalsholat?kota=' + text + '&APIKEY=hairullana')
		.then(res => res.json())
		.then(batch => {
			conn.updatePresence(m.chat, Presence.composing) 
      if (batch.code != 200) return conn.reply(m.chat,`*[ JADWAL SHOLAT ERROR ]*\n\nFitur jadwal sholat sedang error !`)
			conn.reply(m.chat, `*[ JAWDAL SHOLAT ]*\n\n*Kota :* ${batch.Kota}\n*Tanggal :* ${batch.Tanggal}\n\n*Subuh :* ${batch.Subuh}\n*Dzuhur :* ${batch.Dzuhur}\n*Ashar :* ${batch.Ashar}\n*Maghrib :* ${batch.Maghrib}\n*Isha :* ${batch.Isha}`, m)   
	}) .catch(() => { conn.reply(m.chat, `*[ FITUR ERROR ]*\n\nMaaf fitur ${command} sedang tidak bisa digunakan.`, m) })
}
handler.help = ['jadwalsholat *kota*']
handler.tags = ['islam','information']
handler.command = /^(jadwalsholat)$/i
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