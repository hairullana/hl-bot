let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/TEBAK TEBAKAN/i.test(m.quoted.text)) return
    conn.tebak = conn.tebak ? conn.tebak : {}
    if (!(id in conn.tebak)) return m.reply('Soal itu telah berakhir')

    if (m.quoted.id == conn.tebak[id][0].id) {
        let json = JSON.parse(JSON.stringify(conn.tebak[id][1]))
        if (m.text.toLowerCase() == json.result.jawaban.toLowerCase()) {
            global.DATABASE._data.users[m.sender].exp += conn.tebak[id][2]
            m.reply(`Benar!\n+ Rp. ${conn.tebak[id][2].toLocaleString()}`)
            clearTimeout(conn.tebak[id][3])
            delete conn.tebak[id]
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