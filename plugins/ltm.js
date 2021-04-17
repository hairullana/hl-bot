let handler = async (m, { conn, text }) => {
	var ltm = ['6285892821182-1510584700@g.us','6282245496356-1602153905@g.us','62881023070715-1607687086@g.us']

  var isLTM = false
  for(i=0;i<ltm.length;i++){
    if (m.chat == ltm[i]) isLTM = true; break;
  }
  if (isLTM == false) return conn.reply(m.chat,'Perintah ini hanya bisa di gunakan di grup *LTM BOT・チャットボット*',m)

  if (!text) return conn.reply(m.chat,'Masukkan command / chat nya !\n\nContoh : *.ltm .group close*',m)

  for(i=0;i<ltm.length;i++){
    conn.reply(ltm[i],text)
  }
}

handler.help = ['ltm']
handler.tags = ['owner']
handler.command = /^ltm$/i
handler.admin = true
module.exports = handler