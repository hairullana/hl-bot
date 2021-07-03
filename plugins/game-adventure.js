let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, participants, text }) => {
  conn.adventure = conn.adventure ? conn.adventure : {}
  const delay = time => new Promise(res=>setTimeout(res,time));

  await conn.updatePresence(m.chat, Presence.composing) 
  if (typeof conn.adventure[m.sender] != "undefined" && conn.adventure[m.sender] == true) return m.reply(`*Tidak bisa melakukan adventure lagi karena anda sedang di dalam game bro.*`)

  let users = participants.map(u => u.jid)
  var lawan
	lawan = users[Math.floor(users.length * Math.random())]
  while (typeof global.DATABASE.data.users[lawan] == "undefined"){
    lawan = users[Math.floor(users.length * Math.random())]
  }

  let lamaPertarungan = getRandom(1,5)

  let kegiatan = ['mengocok','cipokan','gelud','menari','mengautis','memuja kerang ajaib','gibahin owner','tertidur pulas','bermain layangan','melempar jumroh','melakukan makar','berjualan bakso','ngegay','merangkak','berenang','makan babi']
  let sifat = ['sangean','raja ngocok','ratu colmek','lord senja','kang bakso','kang gibah','culun','cupu','jagoan','abang jago','anak bangsat','anjing','pemuja setan']
  m.reply(`*Kamu* dan *${conn.getName(lawan)}* si ${sifat[getRandom(0,sifat.length-1)]} dalam petualangan dan sedang ${kegiatan[getRandom(0,kegiatan.length-1)]} bersama.\n\nTunggu ${lamaPertarungan} menit lagi.`)

  conn.adventure[m.sender] = true

  await delay(1000 * 60 * lamaPertarungan)

  let alasanKalah = ['cupu','tolol','kebanyakan coli','kurang tidur','pedang patah','tangan buntung','pincang','mimpi basah','dicurangi','belum ngopi','belum mandi','dengkul kopong','gay','dibenci owner','belum upgrade premium','berak pake wc duduk']
  let alasanMenang = ['hebat','tidak suka merokok','punya pedang panjang','punya pedang kuat','tidak suka coli','sudah ngopi pagi ini','disayang owner','bisa salto','jago','rajin push up','tidak suka ngocok batang','tidak gay']
  let musuh = ['raja semut','komandan sange','gajah berkepala kuda','goblin tombak maut','wildan berkaki empat','naga kepala tiga','anjing rabies','bapakmu','lord orochimaru','guru matematika','guru BK','kepala sekolah','koruptor','kekuatan cinta atta dan aurel']

  let hasil = getRandom(0,1)

  if (hasil == 1){
    let hadiah = getRandom(1,7)
    global.DATABASE.data.users[m.sender].exp += Math.floor(global.DATABASE.data.users[m.sender].exp / 100 * hadiah)
    m.reply(`*Kamu* dan *${conn.getName(lawan)}* berhasil mengalahkan ${musuh[getRandom(0,musuh.length-1)]} karena kalian berdua ${alasanMenang[getRandom(0,alasanMenang.length-1)]}\n\nHadiah Rp. ${Math.floor(global.DATABASE.data.users[m.sender].exp / 100 * hadiah).toLocaleString()} (${hadiah}% saldo)`)
  }else{
    let denda = getRandom(5,10)
    global.DATABASE.data.users[m.sender].exp -= Math.floor(global.DATABASE.data.users[m.sender].exp / 100 * denda)
    m.reply(`*Kamu* dan *${conn.getName(lawan)}* gagal mengalahkan ${musuh[getRandom(0,musuh.length-1)]} karena kalian berdua ${alasanKalah[getRandom(0,alasanKalah.length-1)]}.\n\nUang kamu berkurang Rp. ${Math.floor(global.DATABASE.data.users[m.sender].exp / 100 * denda).toLocaleString()} (${denda}% saldo)`)
  }

  delete conn.adventure[m.sender]
}
handler.help = ['adveture']
handler.tags = ['game']
handler.command = /^(adventure)$/i
handler.limit = true
handler.group = true
handler.exp = 0
module.exports = handler

function getRandom(min,max){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random()*(max-min+1)) + min
}