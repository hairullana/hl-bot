let handler = async (m, { conn, text }) => {
  var temp = global.DATABASE.data.users[m.sender].pasangan
  global.DATABASE.data.users[m.sender].pasangan = ""
  if(global.DATABASE.data.users[m.sender].pasangan == "") {
    conn.reply(m.chat,`*Sadar diri bangsat, anda tidak berpacaran dengan siapa siapa.*`,m)
  }else if (global.DATABASE.data.users[temp].pasangan == m.sender){
    global.DATABASE.data.users[temp].pasangan = ""
    conn.reply(m.chat,`*Berhasil putus hubungan dengan @${temp.split('@')[0]}\n\nMasih banyak manusia lain njing, jadi jangan bundir dulu !*`,m,{contextInfo: {
      mentionedJid: [temp]
    }})
  }
}
handler.help = ['putus']
handler.tags = ['gabut']
handler.command = /^(putus)$/i
// handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
handler.limit = false
// handler.admin = true
// handler.botAdmin = true
handler.fail = null
module.exports = handler