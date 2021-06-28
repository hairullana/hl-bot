let handler = async (m, { conn }) => {
  if (global.DATABASE.data.users[m.sender].warning < 1){
    return conn.reply(m.chat,'*❏ DELETE WARNING*\n\nKamu tidak memiliki warning !')
  }
  global.DATABASE.data.users[m.sender].warning -= 1
  var warn = global.DATABASE.data.users[m.sender].warning
  conn.reply(m.chat, `*❏ DELETE WARNING*\n\n@${m.sender.split('@')[0]} : [ ${warn} / 5 ]\n\nBerhasil membersihkan 1 dosa dengan pengurangan limit !`, null, {contextInfo: {
    mentionedJid: [m.sender]
  }})
}
handler.help = ['delwarn']
handler.tags = ['group admin']
handler.command = /^delwarn$/i
handler.group = true
handler.botAdmin = true
handler.limit = true
module.exports = handler