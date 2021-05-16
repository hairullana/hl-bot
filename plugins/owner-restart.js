let { spawn }  = require('child_process');
let handler  = async (m, { conn }) => {
  if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
  if (global.conn.user.jid == conn.user.jid) {
    await m.reply('*Restarting . . .*')
    await global.DATABASE.save()
    process.send('reset')
  } else throw '*Error!*'
}
handler.help = ['']
handler.tags = ['']
handler.command = /^restart$/i
handler.rowner = true
handler.fail = null
module.exports = handler