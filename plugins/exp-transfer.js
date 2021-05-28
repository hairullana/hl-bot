let handler = async (m, { conn, command, args }) => {
	if(!args || !args[0] || !args[1]){
    return conn.reply(m.chat,`*Masukkan Format Yang Benar !*\n\n*Contoh :*\n*.tf @${global.conn.user.jid.split('@')[0]} 10.000.000*`,m,{contextInfo: {
      mentionedJid: [global.conn.user.jid]
    }})
  }

  target = args[0].replace(/([@+-])/g,'') + "@s.whatsapp.net"
  jumlah = args[1].replace(/([.])/g,'')

  if (typeof global.DATABASE.data.users[target] == "undefined"){
    return m.reply("*Nomor yang ingin anda transfer tidak terdaftar di bot.*")
  }

  if (isNaN(jumlah)){
    return m.reply("*Masukkan hanya berupa angka saja.*")
  }

  if (jumlah < 100000){
    return m.reply("*Transfer minimal Rp. 100.000.*")
  }

  jumlah = parseInt(jumlah)
  tax = Math.ceil((jumlah/100) * 5)

  totalTF = jumlah + tax

  if (global.DATABASE.data.users[m.sender].exp < totalTF){
    maxTF = Math.floor(global.DATABASE.data.users[m.sender].exp / 105 * 100)
    return m.reply(`*Uang anda tidak mencukupi untuk melakukan transfer dengan jumlah Rp. ${jumlah.toLocaleString()} + Rp. ${tax.toLocaleString()} (5% Pajak)*\n\n*Saldo anda : Rp. ${global.DATABASE.data.users[m.sender].exp.toLocaleString()}*\n*Max TF : Rp. ${maxTF.toLocaleString()}*`)
  }

  global.DATABASE.data.users[m.sender].exp -= jumlah
  global.DATABASE.data.users[m.sender].exp -= tax
  global.DATABASE.data.users[target].exp += jumlah

  conn.reply(m.chat, `*[ TRANSFER SUCCESS ]*\n\nTransfer *Rp. ${jumlah.toLocaleString()}* kepada @${target.split('@')[0]}\nPPN *Rp. ${tax.toLocaleString()}* (5%)\n\n@${target.split('@')[0]} : Rp. ${global.DATABASE._data.users[target].exp.toLocaleString()}\n@${m.sender.split('@')[0]} : Rp. ${global.DATABASE._data.users[m.sender].exp.toLocaleString()}`, m, {contextInfo: {
    mentionedJid: [target,m.sender]
  }})
}

handler.help = ['transfer','tf'].map(v => v + " *total*")
handler.tags = ['xp']
handler.command = /^transfer|tf$/i
handler.owner = false
module.exports = handler