let { performance } = require('perf_hooks')
let handler = async (m, { conn }) => {
  let old = performance.now()
  await m.reply('_Testing speed..._\n')
  let neww = performance.now()
  m.reply(neww - old + 'ms')
}
handler.help = ['speed']
handler.tags = ['info', 'tools']

handler.command = /^(speed)$/i
module.exports = handler
