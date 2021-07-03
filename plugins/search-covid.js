let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	if (!args || !args[0]) return conn.reply(m.chat, `Format salah!\n\n*Contoh* : _${usedPrefix + command} bali_`, m)
	let text = args.join` `
	await conn.updatePresence(m.chat, Presence.composing) 
	m.reply(wait)
	fetch("https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=Provinsi%20%3D%20'" + encodeURIComponent(text) + "'&outFields=*&outSR=4326&f=json")
  .then(res => res.json())
  .then(batch => {
    conn.updatePresence(m.chat, Presence.composing) 
    conn.reply(m.chat, `*DATA Covid-19 Provinsi ${batch.features[0].attributes.Provinsi}*\n\nKasus Positif = ${batch.features[0].attributes.Kasus_Posi.toLocaleString()}\nKasus Sembuh = ${batch.features[0].attributes.Kasus_Semb.toLocaleString()}\nKasus Meninggal = ${batch.features[0].attributes.Kasus_Meni.toLocaleString()}`, m)
  }) .catch(() => { conn.reply(m.chat, `_Masukkan nama provinsi yang benar !_`, m) })
}
handler.help = ['covid'].map(v => v + ' *provinsi*')
handler.tags = ['data']
handler.command = /^(covid)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = false
handler.exp = 500
module.exports = handler