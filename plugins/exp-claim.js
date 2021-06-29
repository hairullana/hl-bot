let handler = async (m, { conn }) => {
  waktuClaim = 86400000
  asu = new Date(global.DATABASE._data.users[m.sender].lastclaim + 86400000)
  asu2 = asu - new Date()
  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    // return hours + " Jam " + minutes + " Menit" + seconds + " Detik" + milliseconds;
    return hours + " Jam " + minutes + " Menit";
  }

  if (new Date - global.DATABASE._data.users[m.sender].lastclaim > waktuClaim) {
    function getRandom(min,max){
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random()*(max-min+1)) + min
    }

    if (global.DATABASE.data.users[m.sender].premium){
      level = conn.level(global.DATABASE.data.users[m.sender].xp)[0]
      hadiah = 100
      petiRahasia = getRandom(level,level*level ) * 100000
      global.DATABASE.data.users[m.sender].exp += petiRahasia
      conn.reply(m.chat, `*❏ DAILY CLAIM*\n\nSelamat anda mendapatkan hadiah harian *${hadiah} Limit* dan peti rahasia berisikan uang *Rp. ${petiRahasia.toLocaleString()}*\nSilahkan claim lagi dalam 24 jam\n\n*❏ Hadiah Limit*\nUser Premium : 100 Limit\nUser Biasa : 20 Limit\n\n*❏ Peti Rahasia (Level ${level})*\nUser Premium : Rp. ${Number(level*100000).toLocaleString()} - Rp. ${Number((level*level )*100000).toLocaleString()}\nUser Biasa : Rp. ${Number(level*10000).toLocaleString()} - Rp. ${Number((level*level )*10000).toLocaleString()}`, m)
    }else {
      level = conn.level(global.DATABASE.data.users[m.sender].xp)[0]
      hadiah = 20
      petiRahasia = getRandom(level,level*level ) * 10000
      global.DATABASE.data.users[m.sender].exp += petiRahasia
      conn.reply(m.chat, `*❏ DAILY CLAIM*\n\nSelamat anda mendapatkan bonus *${hadiah} Limit* dan peti rahasia berisikan uang *Rp. ${petiRahasia.toLocaleString()}*\nSilahkan claim lagi dalam 24 jam\n\n*❏ Hadiah Limit*\nUser Premium : 100 Limit\nUser Biasa : 20 Limit\n\n*❏ Peti Rahasia (Level ${level})*\nUser Premium : Rp. ${Number(level*100000).toLocaleString()} - Rp. ${Number((level*level )*100000).toLocaleString()}\nUser Biasa : Rp. ${Number(level*10000).toLocaleString()} - Rp. ${Number((level*level )*10000).toLocaleString()}`, m)
    }

    global.DATABASE.data.users[m.sender].limit += hadiah
    global.DATABASE.data.users[m.sender].lastclaim = new Date * 1
  } else conn.reply(m.chat, `*❏ DAILY CLAIM*\n\nAnda sudah mengklaim klaim bonus harian !\nKlaim lagi dalam ${msToTime(asu2)}`, m)
}
handler.help = ['claim']
handler.tags = ['xp']
handler.command = /^(claim)$/i
handler.fail = null
module.exports = handler

