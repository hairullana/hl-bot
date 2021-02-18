let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`${pickRandom(global.toxic)}`, m)
}
handler.help = ['toxic']
handler.tags = ['text']
handler.command = /^(toxic)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.exp = 350

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

let kata = [
  'babi',
  'monyet',
  'anjing',
  'bool',
  'jembut',
  'memek',
  'kontol',
  'tempik',
  'ngentod',
  'gay',
  'lesbi',
  'wildan',
  'setan',
  'pepek',
  'cangcut',
  'bagong',
  'bangsat',
  'ngentot'
]
let randKata = kata[Math.floor(Math.random() * kata.length)]
global.toxic = [
  `muka lo kek ${randKata}`, `anda tau ${randKata} ?`,`${randKata} Lo ${randKata}`,
  `ngapa ${randKata} ga seneng?`,`ribut sini lo ${randKata}`,`jangan ngakak lo ${randKata}`,
  `wey ${randKata}!!`,`aku sih owh aja ya ${randKata}`,`ga seneng send lokasi lo ${randKata}`,
  `capek w ${randKata}`, `hari ini kau minat gelut ${kata[2]} ?`, `gw tau lo itu ${randKata}`,
  `w ganteng dan lo kek ${randKata}`,`bucin lo ${randKata}`,
  `najis baperan kek ${randKata}`,
  `nge-teh ${randKata}`,`gaya lo sok iye, mukalo kek ${randKata}`,`${randKata} awokwowkok`,`anak ${randKata} lu`
]

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}