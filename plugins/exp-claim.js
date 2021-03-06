let handler = async (m, { conn }) => {
  if (new Date - global.DATABASE._data.users[m.sender].lastclaim > 86400000/24) {
    conn.reply(m.chat, 'Selamat bangsat dapet bonus *Rp. 25.000*\nSilahkan claim lagi di jam berikutnya', m)  
    global.DATABASE._data.users[m.sender].exp += 25000
    global.DATABASE._data.users[m.sender].lastclaim = new Date * 1
  } else conn.reply(m.chat, 'Anda sudah mengklaim klaim bonus !\nKlaim lagi 1 jam kedepan', m)
}
handler.help = ['claim']
handler.tags = ['xp']
handler.command = /^(claim)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

