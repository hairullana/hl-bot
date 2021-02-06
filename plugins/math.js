global.math = global.math ? global.math : {}
let handler  = async (m, { conn, args, usedPrefix }) => {
  // format mata uang
  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }
  if (args.length < 1) return conn.reply(m.chat, `
Mode: ${Object.keys(modes).join(' | ')}

Contoh penggunaan: ${usedPrefix}math hard
`.trim(), m)
  let mode = args[0].toLowerCase()
  if (!(mode in modes)) return conn.reply(m.chat, `
Mode: ${Object.keys(modes).join(' | ')}

Contoh penggunaan: ${usedPrefix}math hard
`.trim(), m)
  let id = m.chat
  if (id in global.math) return conn.reply(m.chat, 'Soal yang lama aja belum dijawab, malah minta soal baru anak ajg', global.math[id][0])
  let math = genMath(mode)
  global.math[id] = [
    await conn.reply(m.chat, `Berapa hasil dari *${math.str}*?\n\nTimeout: ${(math.time / 1000).toFixed(2)} detik\nHadiah : Rp. ${format(math.bonus)}`, m),
    math, 4,
    setTimeout(() => {
      if (global.math[id]) conn.reply(m.chat, `Waktu habis cok !\nJawabannya adalah ${math.result}`, global.math[id][0])
      delete global.math[id]
    }, math.time)
  ]
}
handler.help = ['math <mode>']
handler.tags = ['game']
handler.command = /^math/i

module.exports = handler

let modes = {
  noob: [-3, 3,-3, 3, '+-', 15000, 100],
  easy: [-10, 10, -10, 10, '*/+-', 20000, 250],
  medium: [-40, 40, -20, 20, '*/+-', 40000, 500],
  hard: [-100, 100, -70, 70, '*/+-', 60000, 1000],
  extreme: [-999999, 999999, -999999, 999999, '*/', 99999, 5000],
  impossible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 10000],
  impossible2: [-999999999999999, 999999999999999, -999, 999, '/', 30000, 7500]
} 

let operators = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷'
}

function genMath(mode) {
  let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
  let a = randomInt(a1, a2)
  let b = randomInt(b1, b2)
  let op = pickRandom([...ops])
  let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
  if (op == '/') [a, result] = [result, a]
  return {
    str: `${a} ${operators[op]} ${b}`,
    mode,
    time,
    bonus,
    result
  }
}

function randomInt(from, to) {
  if (from > to) [from, to] = [to, from]
  from = Math.floor(from)
  to = Math.floor(to)
  return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
