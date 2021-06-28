let handler = async (m, { conn, command, args }) => {
  if (args[0] == "pc"){
    let chats = conn.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net'))
    let total = 0
    for (let chat of chats) {
      if (chat.jid != "6283182859981@s.whatsapp.net"){
        total += 1
        conn.modifyChat(chat.jid, 'delete')
      }
    }
    return m.reply(`*Berhasil menghapus ${total} private chat bos.*`)
  }

  if (args[0] == "all"){
    conn.chats.array.filter(v => v.jid.endsWith('g.us')).map(v => conn.modifyChat(v.jid, 'delete').catch(console.log))
    conn.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net')).map(v => conn.modifyChat(v.jid, 'delete').catch(console.log))
    return m.reply("*Semua chat telah dibersihkan tuan*")
  }

  let chats = args.length > 0 && /group|gc/i.test(args[0]) ? conn.chats.array.filter(v => v.jid.endsWith('g.us') && !v.pin).map(v => v.jid) : [m.chat]
  let isDelete = /^(clear|delete)/i.test(command)
  for (let id of chats) {
    if (isDelete) await conn.modifyChat(id, 'delete').catch(console.log)
    await conn.modifyChat(id, 'mute', -Math.floor(new Date / 1e3) * 1e3 - 1e3).catch(console.log)
  }
  conn.reply(m.chat, `*` + chats.length + ' chat grup telah dib' + (isDelete ? 'ersihkan tuan*' : 'isukan selamanya'), m)
}
handler.help = ['clear', 'clear all', 'clear pc']
handler.tags = ['owner']
handler.command = /^(clear)$/i
handler.owner = true
handler.fail = null

module.exports = handler

