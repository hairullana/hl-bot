global.math = global.math ? global.math : {}
let handler = async (m, { conn }) => {

  // format mata uang
  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }

  let id = m.chat
  if (!m.quoted) return
  if (m.quoted.sender != conn.user.jid) return
  if (!/^Berapa hasil dari/i.test(m.quoted.text)) return
  if (!(m.chat in global.math)) return conn.reply(m.chat, 'Soal itu telah berakhir !', m)
  if (m.quoted.id == global.math[id][0].id) {
  let math = global.math[id][1]
  if (m.text == math.result) {
    global.DATABASE._data.users[m.sender].money += math.bonus
    conn.reply(m.chat, `*Jawaban Benar!*\n\nUangmu bertambah *Rp. ${format(math.bonus)}*\nTotal uangmu : *Rp. ${format(global.DATABASE._data.users[m.sender].money)}*`, m)
    clearTimeout(global.math[id][3])
    delete global.math[id]
  } else {
    if (--global.math[id][2] == 0) {
      conn.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${math.result}*`, m)
      clearTimeout(global.math[id][3])
      delete global.math[id]
    } else {
      global.DATABASE._data.users[m.sender].money -= math.bonus/4
      if (global.DATABASE._data.users[m.sender].money < 0){
        global.DATABASE._data.users[m.sender].money = 0
      }
      conn.reply(m.chat, `*Jawaban Salah!*\nMasih ada ${global.math[id][2]} kesempatan\n\nUangmu berkurang *Rp. ${format(math.bonus/4)}*\nTotal uangmu *Rp. ${format(global.DATABASE._data.users[m.sender].money)}*`, m)
    }
  }
 }
}
handler.customPrefix = new RegExp
handler.command = /^-?[0-9]+(\.[0-9]+)?$/
handler.exp = 0

module.exports = handler
