  
let handler = async (m, { conn,args,command }) => {
  // let groups = conn.chats.array.filter(v => v.jid.endsWith('g.us') && !v.read_only && v.message).map(v => v.jid)
  
  // groups.filter(v => v.jid.endsWith('g.us')).map(v => conn.modifyChat(v.jid, 'delete').catch(console.log).then(() => {conn.reply(v.jid,'Chat Group Telah Dibersihkan')}))
  conn.chats.array.filter(v => v.jid.endsWith('g.us')).map(v => conn.modifyChat(v.jid, 'delete').catch(console.log).then(() => {conn.reply(v.jid,'Chat Group Telah Dibersihkan')}))
  conn.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net')).map(v => conn.modifyChat(v.jid, 'delete').catch(console.log))
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