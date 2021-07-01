let handler = m => m
handler.before = async (m, { conn }) => {
  // backup db 1 jam sekali
	if(new Date() * 1 - global.DATABASE.data.backupDB > 1000 * 60 * 60){
		conn.sendFile(owner[0] + '@s.whatsapp.net',`./hl_`,`hl_`)
		global.DATABASE.data.backupDB = new Date() * 1
	}
}
module.exports = handler