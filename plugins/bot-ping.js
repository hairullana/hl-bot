let { performance } = require('perf_hooks')
let handler = async (m, { conn }) => {
  let old = performance.now()
  let neww = performance.now()
  conn.reply(m.chat,`*[ BOT STATUS ]*\n\n*Status* : Best Performance\n*Ping :* ${(neww-old)} ms\n\n*Device :* ASUS ROG STRIX GL503\n*Processor :* Intel® Core™ i7-8750H 4.2 GHz\n*Memory :* 11.43GB / 32GB\n*Hard Drive :* 2TB SSD\n*Graphic :* NVIDIA® GeForce® GTX1050Ti 4GB GDDR5 VRAM`)
}
handler.help = ['ping']
handler.tags = ['info']

handler.command = /^(ping)$/i
module.exports = handler
