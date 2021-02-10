let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`“${pickRandom(global.wina)}”`, m)
}
handler.help = ['wina']
handler.tags = ['fun']
handler.command = /^(wina)$/i
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

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.wina = [
  "Daripada ipk mending bangun portfolio","Tempatku di tong sampah","Tempatku di tong sampah sama teh pucuk", "Sampah kayak aku bisa apa", "Menjadi hima adalah jalan ninjaku","Gaji besar tapi kerja ringan lebih nikmat daripada gaji kecil tapi kerja berat","Cewek ku dah banyak😎","Hanya beruntung pak🙏"
]
