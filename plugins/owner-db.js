let handler = async (m, { conn }) => {
  conn.sendFile(owner[0] + '@s.whatsapp.net',`./hl_`,`hl_`).then(() => {
    m.reply(`Sudah dikirim di personal chat tuan.`)
  })
}
handler.help = ['db']
handler.tags = ['owner']
handler.command = /^(db)$/i
handler.owner = true
module.exports = handler