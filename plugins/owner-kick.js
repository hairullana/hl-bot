let handler = async (m, { conn, text }) => {
	function no(number){
    return number.replace(/\s/g,'').replace(/([+-])/g,'')
  }

	text = no(text)

	if(isNaN(text)) {
  	var number = text.split`@`[1]
  } else if(!isNaN(text)) {
  	var number = text
  }
  if(!text && !m.quoted) return conn.reply(m.chat, `*Berikan nomor, tag atau reply chat target.*`, m)
  if(isNaN(number)) return conn.reply(m.chat, `*Nomor tidak valid.*`, m)
  if(number.length > 15) return conn.reply(m.chat, `*Format is Invalid.*`, m)
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
	let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
	let participants = m.isGroup ? groupMetadata.participants : []
	let users = m.isGroup ? participants.find(u => u.jid == user) : {}
	if(!users) return conn.reply(m.chat, `*Target atau Nomor tidak ditemukan, mungkin sudah keluar atau bukan anggota grup ini.*`, m)
	if(user === conn.user.jid) return conn.reply(m.chat, `*Tidak bisa meng-kick bot dari grup.*`, m)
	await conn.groupRemove(m.chat, [user])
	}	
}
handler.help = []
handler.tags = []
handler.command = /^(-)$/i
handler.owner = true
handler.group = true
handler.botAdmin = true
handler.fail = null
module.exports = handler