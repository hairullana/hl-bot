  
let handler = async (m, { conn,args,command }) => {
  conn.chats.array.filter(v => v.jid.endsWith('g.us')).map(v => conn.modifyChat(v.jid, 'delete').catch(console.log))
  conn.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net')).map(v => conn.modifyChat(v.jid, 'delete').catch(console.log))
  
  m.reply("*Semua chat telah dibersihkan tuan*")
}
handler.help = ['clearall']
handler.tags = ['owner']
handler.command = /^(clearall)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler