let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, text, usedPrefix, command }) => {
	await conn.updatePresence(m.chat, Presence.composing)
  if (!text) return conn.reply(m.chat,`*[ INFO CUACA ERROR ]*\n\nSilahkan masukkan nama kota\nContoh : ${usedPrefix}${command} denpasar`)
	fetch('https://api.xteam.xyz/cuaca?kota=' + text + '&APIKEY=01ce7f0db36607bf')
		.then(res => res.json())
		.then(batch => {
			conn.updatePresence(m.chat, Presence.composing) 
      if (batch.code != 200) return conn.reply(m.chat,`*[ INFO CUACA ERROR ]*\n\nFitur jadwal sholat sedang error !`)
			conn.reply(m.chat, `*[ INFO CUACA ]*\n\n*Kota :* ${batch.message.kota}\n*Tanggal :* ${batch.message.hari}\n\n*Cuaca :* ${batch.message.cuaca} (${batch.message.deskripsi})\n*Suhu :* ${batch.message.suhu}\n*Pressure :* ${batch.message.pressure}\n*Kelembapan :* ${batch.message.kelembapan}\n*Angin :* ${batch.message.angin}`, m)   
	}) .catch(() => { conn.reply(m.chat, `*[ FITUR ERROR ]*\n\nMaaf fitur ${command} sedang tidak bisa digunakan.`, m) })
}
handler.help = ['cuaca *kota*']
handler.tags = ['information']
handler.command = /^(cuaca)$/i
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