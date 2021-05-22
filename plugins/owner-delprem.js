let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
  function no(number){
    return number.replace(/\s/g,'').replace(/([+-])/g,'')
  }

  text = no(text) + "@s.whatsapp.net"
  global.DATABASE.data.users[text].premium = false
  global.DATABASE.data.users[text].premiumDate = 0
  conn.reply(m.chat,`*Berhasil menghapus akses premium untuk @${text.split('@')[0]}.*`,m,{ contextInfo: { mentionedJid: [text] } })

}
handler.help = ['delprem']
handler.tags = ['owner']
handler.command = /^(delprem)$/i
handler.owner = true
handler.mods = false
handler.premium = false
// handler.group = true
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler