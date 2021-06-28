let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, text, usedPrefix, command }) => {
	await conn.updatePresence(m.chat, Presence.composing)
  if (!text) return conn.reply(m.chat,`Silahkan masukkan nama kota\nContoh : ${usedPrefix}${command} denpasar`)
	m.reply(wait)
	fetch(global.API('xteam', '/cuaca', { kota: text }, 'APIKEY'))
		.then(res => res.json())
		.then(batch => {
			conn.updatePresence(m.chat, Presence.composing) 
      if (batch.code != 200) return m.reply(error)
			conn.reply(m.chat, `*❏ INFO CUACA*\n\n*Kota :* ${batch.message.kota}\n*Tanggal :* ${batch.message.hari}\n\n*Cuaca :* ${batch.message.cuaca} (${batch.message.deskripsi})\n*Suhu :* ${batch.message.suhu}\n*Pressure :* ${batch.message.pressure}\n*Kelembapan :* ${batch.message.kelembapan}\n*Angin :* ${batch.message.angin}`, m)   
	}) .catch(() => { m.reply(error) })
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