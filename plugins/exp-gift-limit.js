let handler = async (m, { conn, command, text }) => {
	if(!text){
    return conn.reply(m.chat,`*Masukkan Format Yang Benar !*\n\n*Contoh :*\n*.gift @${global.conn.user.jid.split('@')[0]} 10.000.000*\n*.gift 10.000.000 (reply chat)*`,m,{contextInfo: {
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
      return conn.reply(m.chat,`*Masukkan Format Yang Benar !*\n\n*Contoh :*\n*.gift @${global.conn.user.jid.split('@')[0]} 10.000.000*\n*.gift 10.000.000 (reply chat)*`,m,{contextInfo: {
        mentionedJid: [global.conn.user.jid]
      }})
    }
    jumlah = hl[0].replace(/([.])/g,'')
  }else {
    target = hl[0].replace(/([@+-])/g,'') + "@s.whatsapp.net"
    if (!hl[1]) {
      return conn.reply(m.chat,`*Masukkan Format Yang Benar !*\n\n*Contoh :*\n*.gift @${global.conn.user.jid.split('@')[0]} 10.000.000*\n*.gift 10.000.000 (reply chat)*`,m,{contextInfo: {
        mentionedJid: [global.conn.user.jid]
      }})
    }
    jumlah = hl[1].replace(/([.])/g,'')
  }

  if (target == global.conn.user.jid) return m.reply("*Tidak bisa melakukan transfer ke HL Bot.*")

  if (typeof global.DATABASE.data.users[target] == "undefined"){
    return m.reply(`*Nomor yang ingin anda transfer tidak terdaftar di Hl Bot.*\n\n*Contoh :*\n*.gift @${global.conn.user.jid.split('@')[0]} 10.000.000*\n*.gift 10.000.000 (reply chat)*`,m,{contextInfo: {
      mentionedJid: [global.conn.user.jid]
    }})
  }

  if (isNaN(jumlah)){
    return m.reply("*Masukkan hanya berupa angka saja.*")
  }

  if (jumlah < 1){
    return m.reply("*Gift minimal 1 limit.*")
  }

  jumlah = parseInt(jumlah)

  if (global.DATABASE.data.users[m.sender].limit < jumlah+1){
    return m.reply(`*Limit anda tidak mencukupi untuk melakukan gift dengan jumlah ${jumlah.toLocaleString()} limit.*\n*Minimal tersisa 1 limit setelah melakukan gift.*`)
  }

  global.DATABASE.data.users[m.sender].limit -= jumlah
  global.DATABASE.data.users[target].limit += jumlah

  conn.reply(m.chat, `*[ GIFT LIMIT ]*\n\nGift *${jumlah.toLocaleString()} limit* kepada @${target.split('@')[0]}\n\n@${target.split('@')[0]} : ${global.DATABASE.data.users[target].limit.toLocaleString()} Limit\n@${m.sender.split('@')[0]} : ${global.DATABASE.data.users[m.sender].limit.toLocaleString()} Limit`, m, {contextInfo: {
    mentionedJid: [target,m.sender]
  }})
}

handler.help = ['gift'].map(v => v + " _total_")
handler.tags = ['xp']
handler.command = /^gift$/i
handler.premium = true
handler.limit = true
module.exports = handler