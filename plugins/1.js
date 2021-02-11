let { Presence, MessageType } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')

let gtts = require('node-gtts')
let fs = require('fs')
let path = require('path')
let { spawn } = require('child_process')
let handler  = async (m, { conn }) => {
  conn.updatePresence(m.chat, Presence.composing) 
  const buffer = fs.readFileSync("media/ah2.mp3")
  const options = { ptt: true } 
  conn.sendMessage(m.chat, buffer, MessageType.audio, options)
}

// handler.help = ['p']
// handler.tags = ['data']
handler.command = /^(p)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = true
handler.exp = 500
module.exports = handler