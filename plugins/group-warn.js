let handler = async (m, { conn, text }) => {
  if(isNaN(text)) {
  	var number = text.split`@`[1]
  } else if(!isNaN(text)) {
  	var number = text
  }
  if(!text && !m.quoted) return conn.reply(m.chat, `*[ ERROR ]*\nGive a number, tag or reply chat target`, m)
  //let exists = await conn.isOnWhatsApp(number)
  // if (exists) return conn.reply(m.chat, `*Nomor target tidak terdaftar di WhatsApp*`, m)
  if(isNaN(number)) return conn.reply(m.chat, `*[ ERROR ]*\nInvalid Number`, m)
  if(number.length > 15) return conn.reply(m.chat, `*[ ERROR ]*\nInvalid Number`, m)
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
        badword: 0,
        isBlocked: false,
        isBanned: false
      }
  
 }
  
	let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
    let participants = m.isGroup ? groupMetadata.participants : []
	let users = m.isGroup ? participants.find(u => u.jid == user) : {}
	let isAdmin = users.isAdmin || users.isSuperAdmin || false
	let number = user.split('@')[0]
	if(isAdmin) return conn.reply(m.chat, `*[ ERROR ]*\n\nCan't give warning to admin group !`, m)
  
	
	global.DATABASE.data.users[user].badword += 1
	var warn = global.DATABASE.data.users[user].badword
 	if(warn > 4) {
 		conn.reply(m.chat, `*[ MEMBER WARNING ]*\n\nSorry motherfucker, you will be removed from this group !`, null, {contextInfo: {
          mentionedJid: [user]
 	}}).then(() => {
 		conn.groupRemove(m.chat, [user])
 	})
 } else {
 	conn.reply(m.chat, `*[ MEMBER WARNING ]*\n\n@${number} get a warning : [ ${warn} / 5 ]\n\nBe careful if you get 5 warnings you will be issued automatically !`, null, {contextInfo: {
          mentionedJid: [user]
 	}})
}

 
 }
}
handler.help = ['warn *62xx*', 'warn *(reply)*','warn *@user*']
handler.tags = ['group admin']
handler.command = /^warn$/i
handler.admin = false
handler.group = true
handler.botAdmin = true
module.exports = handler