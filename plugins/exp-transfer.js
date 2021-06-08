let handler = async (m, { conn, command, text }) => {
	if(!text){
    return conn.reply(m.chat,`*Masukkan Format Yang Benar !*\n\n*Contoh :*\n*.tf @${global.conn.user.jid.split('@')[0]} 10.000.000*\n*.tf 10.000.000 (reply chat)*`,m,{contextInfo: {
      mentionedJid: [global.conn.user.jid]
    }})
  }

  var hl = [] 
  hl[0] = text.split(' ')[0]
  hl[1] = text.split(' ')[1]
  var target

  if(m.quoted){
    target = m.quoted.sender
    if (hl[0].startsWith("@")) {
      return conn.reply(m.chat,`*Masukkan Format Yang Benar !*\n\n*Contoh :*\n*.tf @${global.conn.user.jid.split('@')[0]} 10.000.000*\n*.tf 10.000.000 (reply chat)*`,m,{contextInfo: {
        mentionedJid: [global.conn.user.jid]
      }})
    }
    jumlah = hl[0].replace(/([.])/g,'')
  }else {
    target = hl[0].replace(/([@+-])/g,'') + "@s.whatsapp.net"
    if (!hl[1]) {
      return conn.reply(m.chat,`*Masukkan Format Yang Benar !*\n\n*Contoh :*\n*.tf @${global.conn.user.jid.split('@')[0]} 10.000.000*\n*.tf 10.000.000 (reply chat)*`,m,{contextInfo: {
        mentionedJid: [global.conn.user.jid]
      }})
    }
    jumlah = hl[1].replace(/([.])/g,'')
  }

  if (target == global.conn.user.jid) return m.reply("*Tidak bisa melakukan transfer ke HL Bot.*")

  if (typeof global.DATABASE.data.users[target] == "undefined"){
    return conn.reply(m.chat,`*Nomor yang ingin anda transfer tidak terdaftar di bot.*\n\n*Contoh :*\n*.tf @${global.conn.user.jid.split('@')[0]} 10.000.000*\n*.tf 10.000.000 (reply chat)*`,m,{contextInfo: {
      mentionedJid: [global.conn.user.jid]
    }})
  }

  if (isNaN(jumlah)){
    return conn.reply(m.chat,`*Masukkan hanya berupa angka saja.*\n\n*Contoh :*\n*.tf @${global.conn.user.jid.split('@')[0]} 10.000.000*\n*.tf 10.000.000 (reply chat)*`,m,{contextInfo: {
      mentionedJid: [global.conn.user.jid]
    }})
  }

  if (jumlah < 100000){
    return m.reply("*Transfer minimal Rp. 100.000.*")
  }

  jumlah = parseInt(jumlah)
  tax = Math.ceil((jumlah/100) * 5)

  totalTF = jumlah + tax

  if (global.DATABASE.data.users[m.sender].exp < totalTF){
    maxTF = Math.floor(global.DATABASE.data.users[m.sender].exp / 105 * 100)
    return conn.reply(m.chat,`*Uang anda tidak mencukupi untuk melakukan transfer dengan jumlah Rp. ${jumlah.toLocaleString()} + Rp. ${tax.toLocaleString()} (5% Pajak)*\n\n*Saldo anda : Rp. ${global.DATABASE.data.users[m.sender].exp.toLocaleString()}*\n*Max TF : Rp. ${maxTF.toLocaleString()}*`)
  }

  global.DATABASE.data.users[m.sender].exp -= jumlah
  global.DATABASE.data.users[m.sender].exp -= tax
  global.DATABASE.data.users[target].exp += jumlah

  conn.reply(m.chat, `*❏  T R A N S F E R  S U C C E S S*\n\nTransfer *Rp. ${jumlah.toLocaleString()}* kepada @${target.split('@')[0]}\nPPN *Rp. ${tax.toLocaleString()}* (5%)\n\n@${target.split('@')[0]} : Rp. ${global.DATABASE._data.users[target].exp.toLocaleString()}\n@${m.sender.split('@')[0]} : Rp. ${global.DATABASE._data.users[m.sender].exp.toLocaleString()}`, m, {contextInfo: {
    mentionedJid: [target,m.sender]
  }})
}

handler.help = ['transfer','tf'].map(v => v + " _total_")
handler.tags = ['xp']
handler.command = /^transfer|tf$/i
handler.limit = true
module.exports = handler