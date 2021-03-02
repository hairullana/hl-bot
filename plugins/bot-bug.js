let handler  = async (m, { conn, text}) => {
  if (!text){
    conn.reply(m.chat,'Masukkan laporan bug nya teman :)',m)
  }else {
    conn.reply(global.owner + '@s.whatsapp.net',`*Laporan Bug dari @${m.sender.split('@')[0]}*\n\n${text}`, m,{contextInfo: {
      mentionedJid: [m.sender]
    }})
    conn.reply(m.chat,`*Laporan bug berhasil di kirim*\n\nTahukah kamu fakta mengejutkan bahwa laporan palsu / main-main dapat membuatmu ter *BANNED*`,m)
  }
}
handler.help = ['bug *text*']
handler.tags = ['info']
handler.command = /^(bug)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.exp = 250
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler