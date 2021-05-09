let { Presence } = require('@adiwajshing/baileys')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const FormData = require('form-data')
const { spawn } = require('child_process')
const { MessageType } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, text }) => {
  await conn.updatePresence(m.chat, Presence.composing) 
  if(!text) return conn.reply(m.chat, `*Masukkan 1 emoji untuk dijadikan sticker.*`, m)
 // if(text.length > 1) return conn.reply(m.chat, `*Hanya untuk 1 emoji.*`, m)  
  if (text) {
	let emo = text.codePointAt(0).toString(16)
    let res = await fetch('https://videfikri.com/api/emojitopng/?emojicode=' + emo)
    let img = await res.buffer()
    if (!img) throw img
    let stiker = await sticker(img)
    conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
  }
}
handler.help = ['emo *text*']
handler.tags = ['sticker']
handler.command = /^emo$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.limit = true
handler.exp = 2000
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler

let tmp = path.join(__dirname, '../tmp')
function sticker(img, url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (url) {
        let res = await fetch(url)
        img = await res.buffer()
      }
      let inp = path.join(tmp, +new Date + '.jpeg')
      let png = path.join(tmp, +new Date + '.png')
      let out = path.join(tmp, +new Date + '.webp')
      fs.writeFileSync(inp, img)
      spawn('ffmpeg', [
        '-y',
        '-i', inp,
        '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1',
        png
      ])
      .on('error', reject)
      .on('close', () => {
        fs.unlinkSync(inp)
        spawn('convert', [png, out])
        .on('error', reject)
        .on('close', () => {
          fs.unlinkSync(png)
          resolve(fs.readFileSync(out))
          fs.unlinkSync(out)
        })
      })
    } catch (e) {
      reject(e)
    }
  })
}
