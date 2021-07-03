let handler = async (m, { conn, command, text }) => {
  conn.reply(m.chat, `
*Pertanyaan:* ${command} ${text}
*Jawaban:* ${pickRandom(['Pasti dong bangsat','Ya','Mungkin iya','Mungkin','Mungkin tidak','Tidak','Tidak mungkin','Mana gw tau','Kepo bangsat'])}
`.trim(), m)
}
handler.help = ['apakah'].map(v => v + ' *question*')
handler.tags = ['fun']
handler.command = /^(apakah)/i
handler.fail = null
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

