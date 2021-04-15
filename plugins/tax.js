let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	let list = Object.entries(global.DATABASE.data.users)
	list.slice(0, list.length).map(([user, data], i) => (Number(data.exp -= Math.floor(data.exp/100*10))))
	let chats = conn.chats.array.filter(v => v.jid.endsWith('g.us') && !v.read_only && v.message).map(v => v.jid)
  for (let id of chats) conn.sendMessage(id, '*[ TAX ANNOUNCEMENT ]*\n\nBerhasil memberikan potongan pajak kepada seluruh user *HL Gans* sebesar 10%', m.mtype, m.msg.contextInfo ? {
    contextInfo: m.msg.contextInfo
  } : {})
}
handler.help = ['tax']
handler.tags = ['owner']
handler.command = /^(tax)$/i
handler.rowner = true
handler.exp = 0
handler.fail = null
module.exports = handler

