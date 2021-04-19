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
    // if (global.DATABASE._data.users[m.sender].limit > 200 || global.DATABASE._data.users[m.sender].exp > 25000000){
    //   hadiah = 5
    // }else if (global.DATABASE._data.users[m.sender].limit > 50 || global.DATABASE._data.users[m.sender].exp > 10000000) {
    //   hadiah = 10
    // }else {
    //   hadiah = 20
    // }
    hadiah = 30
    conn.reply(m.chat, `*[ LIMIT CLAIM ]*\n\nSelamat bangsat dapet bonus *${hadiah} Limit*\nSilahkan claim lagi besok`, m)  
    global.DATABASE._data.users[m.sender].limit += hadiah
    
    global.DATABASE._data.users[m.sender].lastclaim = new Date * 1
  } else conn.reply(m.chat, `*[ LIMIT CLAIM ]*\n\nAnda sudah mengklaim klaim bonus harian !\nKlaim lagi dalam ${msToTime(asu2)}`, m)
}
handler.help = ['claim']
handler.tags = ['xp']
handler.command = /^(claim)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

