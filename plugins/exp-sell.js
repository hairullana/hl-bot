// format mata uang
const format = num => {
  const n = String(num),
        p = n.indexOf('.')
  return n.replace(
      /\d(?=(?:\d{3})+(?:\.|$))/g,
      (m, i) => p < 0 || i < p ? `${m},` : m
  )
}

let handler = async (m, { conn, command, args }) => {
  var stok = global.DATABASE._data.users[m.sender].limit
  // harga limit 
  if (isNaN(args[0])){
    return conn.reply(m.chat,'*[ SELL LIMIT ]*\n\nMasukkan jumlah limit dengan angka saja !',m)
  }else if (args[0] > 1000000000 || args[0] < 1){
    return conn.reply(m.chat,`*[ SELL LIMIT ]*\n\nKamu bisa menjual limit minimal 1 dan maksimal 1.000.000.000 !`,m)
  }else if (args[0] > stok){
    return conn.reply(m.chat,`*[ SELL LIMIT ]*\n\nSadar diri bangsat, limit kamu cuma ${stok} !`,m)
  }else {
    var jualLimit = args[0]
  }

  // kurangi limit
  global.DATABASE._data.users[m.sender].limit -= jualLimit
  // tambah duit
  hasilJual = jualLimit*90000
  global.DATABASE._data.users[m.sender].exp += hasilJual
  return conn.reply(m.chat,`*[ SELL LIMIT ]*\n\nBerhasil menjual *${jualLimit} Limit* seharga *Rp. ${format(hasilJual)}*.\n\nSaldo : Rp. ${format(global.DATABASE._data.users[m.sender].exp)}\nLimit : ${format(global.DATABASE._data.users[m.sender].limit)}`,m)
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

