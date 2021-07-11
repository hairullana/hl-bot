let handler = async (m, { conn, command, args }) => {
  var stok = global.DATABASE._data.users[m.sender].limit
  // harga limit 
  if (isNaN(args[0])){
    return conn.reply(m.chat,'Masukkan jumlah limit dengan angka saja !',m)
  }else if (args[0] > 1000000000 || args[0] < 1){
    return conn.reply(m.chat,`Kamu bisa menjual limit minimal 1 dan maksimal 1.000.000.000 !`,m)
  }else if (args[0] > stok){
    return conn.reply(m.chat,`Sadar diri bangsat, limit kamu cuma ${stok} !`,m)
  }else {
    var jualLimit = args[0]
  }

  // kurangi limit
  global.DATABASE._data.users[m.sender].limit -= jualLimit
  // tambah duit
  hasilJual = jualLimit*100000
  global.DATABASE._data.users[m.sender].money += hasilJual
  return conn.reply(m.chat,`*❏ SELL LIMIT*\n\nBerhasil menjual *${jualLimit} Limit* seharga *Rp. ${hasilJual.toLocaleString()}*.\n\nSaldo : Rp. ${global.DATABASE._data.users[m.sender].money.toLocaleString()}\nLimit : ${global.DATABASE._data.users[m.sender].limit.toLocaleString()}`,m)
}
handler.help = ['sell *total*']
handler.tags = ['xp']
handler.command = /^sell$/i
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

