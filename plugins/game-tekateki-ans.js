let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/TEKA TEKI/i.test(m.quoted.text)) return
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    if (!(id in conn.tekateki)) return m.reply('Soal itu telah berakhir')

    if (m.quoted.id == conn.tekateki[id][0].id) {
        let json = JSON.parse(JSON.stringify(conn.tekateki[id][1]))
        if (m.text.toLowerCase() == json.result.jawaban.toLowerCase()) {
            global.DATABASE._data.users[m.sender].exp += conn.tekateki[id][2]
            m.reply(`Benar!\n+ Rp. ${conn.tekateki[id][2].toLocaleString()}`)
            clearTimeout(conn.tekateki[id][3])
            delete conn.tekateki[id]
        } else if (m.text.toLowerCase().endsWith(json.result.jawaban.split` `[1])) m.reply(`Dikit Lagi!`)
        else {
          if (global.DATABASE.data.users[m.sender].exp < 50000){
            global.DATABASE.data.users[m.sender].exp = 0
          }else {
            global.DATABASE.data.users[m.sender].exp -= 50000
          }
          m.reply(`*Jawabanmu Salah!*\nUangmu berkurang Rp. 50.000,-`)
        }
    }
}
handler.exp = 0

module.exports = handler