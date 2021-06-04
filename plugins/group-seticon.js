const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const FormData = require('form-data')
const { spawn } = require('child_process')
const { MessageType, Presence } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, text }) => {
  await conn.updatePresence(m.chat, Presence.composing)
  if(!m.quoted) return conn.reply(m.chat, `*Reply foto yang akan dijadikan icon grup.*`, m)
    let q = m.quoted ? { message: { [m.quoted.mtype]: m.quoted }} : m
    if (/image/.test((m.quoted ? m.quoted : m.msg).mimetype || '')) {
      let img = await conn.downloadM(q)
      if (!img) throw img
      conn.updateProfilePicture(m.chat, img)
    } 
}
handler.help = ['seticon']
handler.tags = ['group admin']
handler.command = /^seticon$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null
module.exports = handler