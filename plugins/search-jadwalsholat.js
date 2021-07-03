let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, text, usedPrefix, command }) => {
	await conn.updatePresence(m.chat, Presence.composing)
  if (!text) return conn.reply(m.chat,`Silahkan masukkan nama kota\nContoh : ${usedPrefix}${command} denpasar`)
	m.reply(wait)
	fetch(global.API('xteam', '/jadwalsholat', { kota: text }, 'APIKEY'))
		.then(res => res.json())
		.then(batch => {
			conn.updatePresence(m.chat, Presence.composing) 
      if (batch.code != 200) return conn.reply(m.chat,error,m)
			conn.reply(m.chat, `*❏ JAWDAL SHOLAT*\n\n*Kota :* ${batch.Kota}\n*Tanggal :* ${batch.Tanggal}\n\n*Subuh :* ${batch.Subuh}\n*Dzuhur :* ${batch.Dzuhur}\n*Ashar :* ${batch.Ashar}\n*Maghrib :* ${batch.Maghrib}\n*Isha :* ${batch.Isha}`, m)   
	}) .catch(() => { conn.reply(m.chat, global.error, m) })
}
handler.help = ['jadwalsholat *kota*']
handler.tags = ['information']
handler.command = /^(jadwalsholat)$/i
handler.fail = null
handler.exp = 500
module.exports = handler