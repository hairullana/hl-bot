let handler = async (m, { conn, text }) => {
  if(isNaN(text)) {
		var number = text.split`@`[1]
	}else if(!isNaN(text)) {
		var number = text
	}

  if(number.length > 15 || (number.length < 9 && number.length > 0)) return conn.reply(m.chat, `*Masukin nomor yg bener gblk !*`, m)

  if (!text && !m.quoted){
    user = m.sender
    orang = "Kamu"
  }else if(text) {
    var user = number + '@s.whatsapp.net'
    orang = "Orang yang kamu tag"
  } else if(m.quoted.sender) {
    var user = m.quoted.sender
    orang = "Orang yang kamu tag"
  } else if(m.mentionedJid) {
    var user = number + '@s.whatsapp.net'
    orang = "Orang yang kamu tag"
  }

  if (typeof global.DATABASE.data.users[user] == "undefined"){
    return m.reply("*Orang yang anda tag tidak terdaftar di HL Bot.*")
  }

  if (global.DATABASE.data.users[global.DATABASE.data.users[user].pasangan] == "" && typeof global.DATABASE.data.users[global.DATABASE.data.users[user].pasangan] == "undefined"){
    return m.reply("*Pacar/gebetan target tidak terdaftar di HL Bot.*")
  }

  if (global.DATABASE.data.users[user].pasangan == "") {
    conn.reply(m.chat, `*${orang} tidak memiliki pasangan dan tidak sedang menembak siapapun*\n\n*Ketik .jadian @user untuk menembak seseorang*`, m)
  }else if (global.DATABASE.data.users[global.DATABASE.data.users[user].pasangan].pasangan != user){
    conn.reply(m.chat, `*${orang} sedang digantung oleh @${global.DATABASE.data.users[user].pasangan.split('@')[0]} karena sedang tidak diterima atau di tolak*\n\n*Ketik .ikhlasin untuk menghapus nama dia dari hatimu*`, m,{contextInfo: {
      mentionedJid: [global.DATABASE.data.users[user].pasangan]
    }})
  }else {
    conn.reply(m.chat, `*${orang} sedang menjalani hubungan dengan @${global.DATABASE.data.users[user].pasangan.split('@')[0]} 💓💓💓*`, m,{contextInfo: {
      mentionedJid: [global.DATABASE.data.users[user].pasangan]
    }})
  }
}
handler.help = ['cekpacar']
handler.tags = ['gabut']
handler.command = /^(cekpacar)$/i
handler.fail = null
module.exports = handler