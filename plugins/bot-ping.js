let { performance } = require('perf_hooks')
let handler = async (m, { conn }) => {
  let old = performance.now()
  let neww = performance.now()
  m.reply(neww - old + ' ms')
}
handler.help = ['ping']
handler.tags = ['info']

handler.command = /^(ping)$/i
module.exports = handler
