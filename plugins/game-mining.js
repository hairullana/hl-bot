let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
  conn.mining = conn.mining ? conn.mining : {}

  const delay = time => new Promise(res=>setTimeout(res,time));

  if (typeof conn.mining[m.sender] != "undefined" && conn.mining[m.sender] == true) return m.reply(`*Tidak bisa melakukan mining lagi karena anda sedang menunggu tangkapan harta bro.*`)

  conn.mining[m.sender] = true

  let wait = getRandom(1,5)
  let minute = wait * 1000 * 60
  m.reply("*Sedang mining selama " + wait + " menit*\n\n*Semoga beruntung kawan*")
  await delay(minute)

  let Harta = ['💎','💰','🗿','⚰️','🦠','⚙️','🔩','💣','🥜']
  var mining = Harta[Math.floor(Math.random() * Harta.length)]
  hasilMining = mining
  
  setTimeout(() => {
    if (hasilMining == "🥜"){
      var jumlahHarta = getRandom(1,300)
      var hargaHarta = 1000
      var namaHarta = "Biji Kacang"
    }else if (hasilMining == "🔩"){
      var jumlahHarta = getRandom(1,150)
      var hargaHarta = 2000
      var namaHarta = "Baut"
    }else if (hasilMining == "💣"){
      var jumlahHarta = getRandom(1,12)
      var hargaHarta = 25000
      var namaHarta = "Bom"
    }else if (hasilMining == "⚙️"){
      var jumlahHarta = getRandom(1,600)
      var hargaHarta = 500
      var namaHarta = "Mur"
    }else if (hasilMining == "🦠"){		// < 5jt
      var jumlahHarta = getRandom(1,3)
      var hargaHarta = -100000
      var namaHarta = "Bakteri"
    }else if (hasilMining == '⚰️'){
      var jumlahHarta = getRandom(1,6)
      var hargaHarta = 50000
      var namaHarta = "Peti Mati + Mayat"
    }else if (hasilMining == "🗿"){
      var jumlahHarta = getRandom(1,2)
      var hargaHarta = 150000
      var namaHarta = "Batu Estetik"
    }else if (hasilMining == "💎"){
      var jumlahHarta = getRandom(1,15)
      var hargaHarta = 20000
      var namaHarta = "Berlian"
    }else if (hasilMining == "💰"){
      var jumlahHarta = getRandom(1,3000)
      var hargaHarta = 100
      var namaHarta = "Harta Karun"
    }
    
    global.DATABASE._data.users[m.sender].money += hargaHarta * jumlahHarta
    conn.updatePresence(m.chat, Presence.composing)

    conn.reply(m.chat, `*❏ MINING*\n\nBerhasil mendapatkan ${hasilMining} x ${jumlahHarta}\nHasil penjualan ${jumlahHarta} buah ${namaHarta} *Rp. ${Number(hargaHarta*jumlahHarta).toLocaleString()}*`, m)
    delete conn.mining[m.sender]
  }, 1000)
}
handler.help = ['mining']
handler.tags = ['game']
handler.command = /^(mining)$/i
handler.limit = true
handler.exp = 0
module.exports = handler

function getRandom(min,max){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random()*(max-min+1)) + min
}