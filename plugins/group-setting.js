let { Presence, GroupSettingChange } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, args }) => {
	if(!args || !args[0]) {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `Give a argument close or open!`, m)
	} else if(args[0] == 'open') {
		conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, false)
	} else if(args[0] == 'close') {
		conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, true)
	} else {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, `Give a argument close or open!`, m)
	} 
}
handler.help = ['group *open/close*']
handler.tags = ['group']
handler.command = /^(group)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = true
handler.botAdmin = false
handler.fail = null
handler.exp = 0
module.exports = handler