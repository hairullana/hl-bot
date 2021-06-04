let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
  const delay = time => new Promise(res=>setTimeout(res,time));

  let wait = getRandom(1,5)
  let minute = wait * 1000 * 60
  m.reply("*Sedang memancing selama " + wait + " menit*\n\n*Silahkan mengkopi dan mengsabar dulu*")
  await delay(minute)

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
      var hargaIkan = 70000
      var namaIkan = "Ikan Paus"
    }else if (randIkan2 == '🐋'){
      var jumlahIkan = getRandom(1,2)
      var hargaIkan = 100000
      var namaIkan = "Ikan Paus Biru"
    }else if (randIkan2 == "🦈"){
      var jumlahIkan = getRandom(1,4)
      var hargaIkan = 60000
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
    
    global.DATABASE._data.users[m.sender].exp += hargaIkan * jumlahIkan
    conn.updatePresence(m.chat, Presence.composing)

    tampilanIkan = ""
    for (i=0;i<jumlahIkan;i++){
      tampilanIkan += randIkan + " "
    }

    return conn.reply(m.chat, `*❏  M A N C I N G  M A N I A*\n\nTangkapan : ${tampilanIkan}\nSelamat anda berhasil menangkap *${jumlahIkan} ekor ${namaIkan}* dengan penjualan *Rp. ${Number(hargaIkan*jumlahIkan).toLocaleString()}*`, m)
  }, 1000)
}
handler.help = ['mancing']
handler.tags = ['game']
handler.command = /^(mancing)$/i
handler.limit = true
handler.exp = 0
module.exports = handler

function getRandom(min,max){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random()*(max-min+1)) + min
}