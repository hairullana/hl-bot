let handler = async (m, { conn, text }) => {
  function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }

  text = no(text)

  if(isNaN(text)) {
		var number = text.split`@`[1]
  } else if(!isNaN(text)) {
		var number = text
  }

  if(!text && !m.quoted) return conn.reply(m.chat, `Tag user, tulis nomor, atau balas member yang ingin dihapus catatan kriminalnya`, m)
  //let exists = await conn.isOnWhatsApp(number)
  // if (exists) return conn.reply(m.chat, `*Nomor target tidak terdaftar di WhatsApp*`, m)
  if(isNaN(number)) return conn.reply(m.chat, `Nomor yang kamu masukkan tidak valid !`, m)
  if(number.length > 15) return conn.reply(m.chat, `Nomor yang kamu masukkan tidak valid !`, m)
  try {
		if(text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var user = number + '@s.whatsapp.net'
			}  
		} catch (e) {
  } finally {
    if(typeof global.DATABASE.data.users[user] == 'undefined') {
    global.DATABASE._data.users[user] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        warning: 0,
        chat: 0,
        whitelist: false,
        isBanned: false,
        spam: 0
      }
    }
    
    let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
    let participants = m.isGroup ? groupMetadata.participants : []
    let users = m.isGroup ? participants.find(u => u.jid == user) : {}
    let isAdmin = users.isAdmin || users.isSuperAdmin || false
    let number = user.split('@')[0]

    global.DATABASE.data.users[user].warning = 0
    var warn = global.DATABASE.data.users[user].warning
    conn.reply(m.chat, `*❏ WARNING CLEANER*\n\n@${number} : [ ${warn} / 5 ]\n\nBerhasil membersihkan catatan kriminal kamu, lain kali tau diri ya bgst !`, null, {contextInfo: {
      mentionedJid: [user]
    }})
  }
}
handler.help = ['clean']
handler.tags = ['group admin']
handler.command = /^clean$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
module.exports = handler