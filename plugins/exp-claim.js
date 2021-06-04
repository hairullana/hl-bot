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
    var hadiah
    if (global.DATABASE.data.users[m.sender].premium){
      hadiah = 120
    }else {
      hadiah = 30
    }

    function getRandom(min,max){
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random()*(max-min+1)) + min
    }

    if (global.DATABASE.data.users[m.sender].premium){
      petiRahasia = getRandom(1,25) * 1000000
      global.DATABASE.data.users[m.sender].exp += petiRahasia
      conn.reply(m.chat, `*❏ D A I L Y  C L A I M*\n\nSelamat bangsat dapet bonus *${hadiah} Limit* dan peti rahasia berisikan uang *Rp. ${petiRahasia.toLocaleString()}*\nSilahkan claim lagi besok\n\nUser Premium : 100 Limit\nUser Biasa : 25 Limit`, m)
    }else {
      conn.reply(m.chat, `*❏ D A I L Y  C L A I M*\n\nSelamat bangsat dapet bonus *${hadiah} Limit*\nSilahkan claim lagi besok\n\nUser Premium : 100 Limit\nUser Biasa : 25 Limit`, m)  
    }

    global.DATABASE.data.users[m.sender].limit += hadiah
    global.DATABASE.data.users[m.sender].lastclaim = new Date * 1
  } else conn.reply(m.chat, `*❏ D A I L Y  C L A I M*\n\nAnda sudah mengklaim klaim bonus harian !\nKlaim lagi dalam ${msToTime(asu2)}`, m)
}
handler.help = ['claim']
handler.tags = ['xp']
handler.command = /^(claim)$/i
handler.fail = null
handler.exp = 0

module.exports = handler

