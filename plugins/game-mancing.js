let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args }) => {

	const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }

  function getRandom(min,max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random()*(max-min+1)) + min
  }

  let ikan = ['🐠','🐟','🐡','🐬','🐳','🐋','🦈','🦀','🐊']
  var randIkan = ikan[Math.floor(Math.random() * ikan.length)]
  randIkan2 = randIkan
  
  setTimeout(() => {
    if (randIkan2 == "🐠"){
      var jumlahIkan = getRandom(1,20)
      var hargaIkan = 10000
      var namaIkan = "Ikan Biru"
    }else if (randIkan2 == "🐟"){
      var jumlahIkan = getRandom(1,10)
      var hargaIkan = 20000
      var namaIkan = "Mujair"
    }else if (randIkan2 == "🐡"){
      var jumlahIkan = getRandom(1,5)
      var hargaIkan = 40000
      var namaIkan = "Ikan Buntal"
    }else if (randIkan2 == "🐬"){
      var jumlahIkan = getRandom(1,4)
      var hargaIkan = -500000
      var namaIkan = "Lumba Lumba"
    }else if (randIkan2 == "🐳"){		// < 5jt
      var jumlahIkan = getRandom(1,3)
      var hargaIkan = -70000
      var namaIkan = "Ikan Paus"
    }else if (randIkan2 == '🐋'){
      var jumlahIkan = getRandom(1,2)
      var hargaIkan = -100000
      var namaIkan = "Ikan Paus Biru"
    }else if (randIkan2 == "🦈"){
      var jumlahIkan = getRandom(1,4)
      var hargaIkan = -60000
      var namaIkan = "Ikan Hiu"
    }else if (randIkan2 == "🐊"){
      var jumlahIkan = getRandom(1,2)
      var hargaIkan = 100000
      var namaIkan = "Buaya"
    }else if (randIkan2 == "🦀"){
      var jumlahIkan = getRandom(1,13)
      var hargaIkan = 15000
      var namaIkan = "Kepiting"
    }
    

    
    // minutes = getRandom(1,10)
    // conn.reply(m.chat, `*[ MANCING MANIA ]*\n\nSabar ya sob, lagi mancing selama ${minutes} menit`,m)
    // await sleep(1000*minutes)
    
    global.DATABASE._data.users[m.sender].exp += hargaIkan * jumlahIkan
    conn.updatePresence(m.chat, Presence.composing)

    tampilanIkan = ""
    for (i=0;i<jumlahIkan;i++){
      tampilanIkan += randIkan + " "
    }
    if (hargaIkan > 0){
      return conn.reply(m.chat, `*[ MANCING MANIA ]*\n\nTangkapan : ${tampilanIkan}\nSelamat anda berhasil menangkap *${jumlahIkan} ekor ${namaIkan}* dengan penjualan *Rp. ${format(hargaIkan*jumlahIkan)}*`, m)
    }else {
      if (global.DATABASE._data.users[m.sender].exp <= 0){
        global.DATABASE._data.users[m.sender].exp = 0
      }
      return conn.reply(m.chat, `*[ MANCING MANIA ]*\n\nTangkapan : ${tampilanIkan}\nMampus anda berhasil menangkap *${jumlahIkan} ekor ${namaIkan}* (hewan dilindungi)\n\nDenda *Rp. ${format(hargaIkan*jumlahIkan)}*`, m)
    }
  }, 1000)
}
handler.help = ['mancing *money*']
handler.tags = ['game']
handler.command = /^(mancing)$/i
handler.owner = false
handler.group = false
handler.limit = true

handler.exp = 0
module.exports = handler

function getRandom(min,max){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random()*(max-min+1)) + min
}