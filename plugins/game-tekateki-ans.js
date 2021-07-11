let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/TEKA TEKI/i.test(m.quoted.text)) return
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    if (!(id in conn.tekateki)) return m.reply('Soal itu telah berakhir')

    if (m.quoted.id == conn.tekateki[id][0].id) {
        let json = JSON.parse(JSON.stringify(conn.tekateki[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase()) {
            global.DATABASE._data.users[m.sender].money += conn.tekateki[id][2]
            m.reply(`*Jawabanmu Benar! Bonus Rp. ${conn.tekateki[id][2].toLocaleString()}*`)
            clearTimeout(conn.tekateki[id][3])
            delete conn.tekateki[id]
        } else if (m.text.toLowerCase().endsWith(json.jawaban.split` `[1])) m.reply(`Dikit Lagi!`)
        else {
          if (global.DATABASE.data.users[m.sender].money < 50000){
            global.DATABASE.data.users[m.sender].money = 0
          }else {
            global.DATABASE.data.users[m.sender].money -= 50000
          }
          m.reply(`*Jawabanmu Salah! Uangmu berkurang Rp. 50.000*`)
        }
    }
}
handler.exp = 0

module.exports = handler