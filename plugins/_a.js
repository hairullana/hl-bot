let { MessageType, Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text, participants }) => {
	await conn.updatePresence(m.chat, Presence.composing)

  // USER JOIN 2 GC
	// let x = '6285892821182-1510584700@g.us'
  // let y = '6282245496356-1602153905@g.us'
  // let _x = await conn.groupMetadata(x)
  // let _xpar = _x.participants
  // let _y = await conn.groupMetadata(y)
  // let _ypar = _y.participants
  // z = []
  // var i
  // var j
  // for (i = 0; i<_xpar.length; i++) {
  //   for (j = 0; j<_ypar.length; j++) {
  //     if (_xpar[i].jid == _ypar[j].jid){
  //       z.push(_xpar[i].jid)
  //     }
  //   }
  // }
	// m.reply(z)
}

handler.command = /^(m)$/i
handler.owner = true
handler.fail = null
module.exports = handler