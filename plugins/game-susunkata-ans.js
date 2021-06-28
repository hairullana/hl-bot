let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/SUSUN KATA/i.test(m.quoted.text)) return
    conn.susunkata = conn.susunkata ? conn.susunkata : {}
    if (!(id in conn.susunkata)) return m.reply('Soal itu telah berakhir')

    if (m.quoted.id == conn.susunkata[id][0].id) {
        let json = JSON.parse(JSON.stringify(conn.susunkata[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase()) {
            global.DATABASE._data.users[m.sender].exp += conn.susunkata[id][2]
            m.reply(`*Jawabanmu Benar! Bonus Rp. ${conn.susunkata[id][2].toLocaleString()}*`)
            clearTimeout(conn.susunkata[id][3])
            delete conn.susunkata[id]
        } else if (m.text.toLowerCase().endsWith(json.jawaban.split` `[1])) m.reply(`Dikit Lagi!`)
        else {
          if (global.DATABASE.data.users[m.sender].exp < 50000){
            global.DATABASE.data.users[m.sender].exp = 0
          }else {
            global.DATABASE.data.users[m.sender].exp -= 50000
          }
          m.reply(`*Jawabanmu Salah! Uangmu berkurang Rp. 50.000*`)
        }
    }
}
handler.exp = 0

module.exports = handler