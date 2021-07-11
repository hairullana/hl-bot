let handler = async (m, { text }) => {

  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }

  count = Math.floor(Math.random() * 100000) + 10000
    buah = ['😡','🥺','😳','😱','🤗','😧','🙄','😬','😩','😣','😖','😂','😅','🙂','😇'] // Versi Simpel
            satu = buah[Math.floor(Math.random() * (buah.length))]	
            dua = buah[Math.floor(Math.random() * (buah.length))]	
            tiga = buah[Math.floor(Math.random() * (buah.length))]	
  if (satu === dua && dua === tiga){
    global.DATABASE._data.users[m.sender].money += count
    await m.reply(`❏ YOU WIN
  
[  🎰 | SLOTS ]
-----------------
${satu} : ${dua} : ${tiga}
${satu} : ${dua} : ${tiga} <=====
${satu} : ${dua} : ${tiga}
-----------------
[  🎰 | SLOTS ]

BONUS Rp. ${format(count)}
`)
  } else {
    await m.reply(`❏ YOU LOOSE

[  🎰 | SLOTS ]
-----------------
${satu} : ${dua} : ${tiga}
${satu} : ${dua} : ${tiga} <=====
${satu} : ${dua} : ${tiga}
-----------------
[  🎰 | SLOTS ]

Keterangan : Kamu menang jika mendapatkan 3 emot yang sama anda Menang
Contoh : 😱 : 😱 : 😱<=====

`)
  }
}
handler.help = ['slots','slot']
handler.tags = ['game']
handler.command = /^(slots|slot)$/i
handler.limit = true
module.exports = handler