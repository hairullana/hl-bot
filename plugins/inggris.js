let gtts = require('node-gtts')
let fs = require('fs')
let path = require('path')
let { spawn } = require('child_process')
let handler  = async (m, { conn }) => {
	conn.sendFile(m.chat, 'media/anu.opus', 'tts.opus', null, m, true)
}
handler.help = ['inggris','anu']
handler.tags = ['fun']
handler.command = /^(inggris|anu)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.exp = 0
module.exports = handler