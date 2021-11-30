let handler  = async (m, { conn, text }) => {
  let chats = conn.chats.array.filter(v => v.jid.endsWith('g.us') && !v.read_only && v.message).map(v => v.jid)
  const delay = time => new Promise(res=>setTimeout(res,time));
  for (let id of chats){
    conn.sendMessage(id, text + (/broadcast/im.test(text) ? '' : ('\n' + readMore + '\n[ _*BROADCAST*_ ]')), m.mtype, m.msg.contextInfo ? {
      contextInfo: m.msg.contextInfo
    } : {})
    await delay(2500)
  }
  conn.reply(m.chat, `*Mengirim pesan broadcast ke ${chats.length} grup*`, m)
}
handler.help = ['bcgc']
handler.tags = ['owner']
handler.command = /^(bcgc)$/i
handler.owner = true
handler.fail = null
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

