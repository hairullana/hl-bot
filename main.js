let {
  WAConnection: _WAConnection,
  WA_MESSAGE_STUB_TYPES,
  Presence,
  MessageType,
  MessageOptions,
  Mimetype,
  GroupSettingChange
} = require('@adiwajshing/baileys')
let {
  generate
} = require('qrcode-terminal')
let qrcode = require('qrcode')
let simple = require('./lib/simple')
let yargs = require('yargs/yargs')
let syntaxerror = require('syntax-error')
let chalk = require('chalk')
let fs = require('fs')
let path = require('path')
let util = require('util')
let {
  performance
} = require('perf_hooks')
let WAConnection = simple.WAConnection(_WAConnection)


const format = num => {
  const n = String(num),
    p = n.indexOf('.')
  return n.replace(
    /\d(?=(?:\d{3})+(?:\.|$))/g,
    (m, i) => p < 0 || i < p ? `${m},` : m
  )
}

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({
    ms,
    h,
    m,
    s
  })
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

global.prefixhl = "."
global.packname = 'HL Gans'
global.author = 'LTM BOT'
global.wait = '_Sedang diproses . . ._'
global.error = '_Error!_'

global.owner = ['6283119526456','6285157700416'] // Put your number here
global.mods = ['6281257735703','62895323133060'] // Want some help?
global.prems = [] // Premium user has unlimited limit
global.APIs = { // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',
  xteam: 'https://api.xteam.xyz',
  tobz: 'https://tobz-api.herokuapp.com',
  vinz: 'https://api.zeks.xyz',
  arugaz: 'https://arugaz.herokuapp.com',
  melodic: 'http://api-melodicxt-2.herokuapp.com',
  wpics: 'https://waifu.pics',
  nopal: 'https://naufalhoster.xyz',
  dhyzx: 'https://dhyzx-free-api.herokuapp.com',
  lol: 'http://lolhuman.herokuapp.com',
  h404: 'https://h4ck3rs404-api.herokuapp.com',
  pcode: 'https://pencarikode.xyz',
  vhtear: 'https://api.vhtear.com',
  zahir: 'https://zahirr-web.herokuapp.com',
  jojo: 'https://docs-jojo.herokuapp.com',
  fikri: 'https://videfikri.com',
  apiflash: 'https://api.apiflash.com',
  public_restapi: 'http://public-restapi.herokuapp.com',
  lindow: 'https://lindow-api.herokuapp.com'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://videfikri.com': '',
  'https://api.xteam.xyz': 'hairullana'
}
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
  ...query,
  ...(apikeyqueryname ? {
    [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
  } : {})
})) : '')
global.timestamp = {
  start: new Date
}
const PORT = process.env.PORT || 3000
let opts = yargs(process.argv.slice(2)).exitProcess(false).parse()
global.opts = Object.freeze({
  ...opts
})

global.prefix = new RegExp('^[' + (opts['prefix'] || prefixhl ) + ']')

// set db awal
global.DATABASE = new(require('./lib/database'))(opts._[0] ? opts._[0] + '_' : '' + 'database.json', null, 2)
if (!global.DATABASE.data.users) global.DATABASE.data = {
  users: {},
  groups: {},
  chats: {},
  blocked: 0,
  banned: 0,
  groupMode: false,
  selfMode: false,
}

if (!global.DATABASE.data.groups) global.DATABASE.data.groups = {}
if (!global.DATABASE.data.chats) global.DATABASE.data.chats = {}

if (opts['server']) {
  let express = require('express')
  global.app = express()
  app.all('*', async (req, res) => {
    await global.conn.connect().catch(console.log)
    res.end(await qrcode.toBuffer(global.qr))
  })
  app.listen(PORT, () => console.log('App listened on port', PORT))
}
global.conn = new WAConnection()
let authFile = `${opts._[0] || 'session'}.data.json`
if (fs.existsSync(authFile)) conn.loadAuthInfo(authFile)
if (opts['big-qr'] || opts['server']) conn.on('qr', qr => generate(qr, {
  small: false
}))
if (opts['server']) conn.on('qr', qr => {
  global.qr = qr
})
conn.on('credentials-updated', () => fs.writeFileSync(authFile, JSON.stringify(conn.base64EncodedAuthInfo())))
let lastJSON = JSON.stringify(global.DATABASE.data)

setInterval(async () => {
  conn.logger.info('Saving database . . .')
  if (JSON.stringify(global.DATABASE.data) == lastJSON) conn.logger.info('Database is up to date')
  else {
    global.DATABASE.save()
    conn.logger.info('Done saving database!')
    lastJSON = JSON.stringify(global.DATABASE.data)
  }
}, 60 * 1000) // Save every 1 minutes
conn.handler = async function (m) {

  try {
    simple.smsg(this, m)
    m.exp = 0
    m.limit = false

    try {
      const isNumber = x => typeof x === 'number' && !isNaN(x)
      let user
      if (user = global.DATABASE._data.users[m.sender]) {
        if (!isNumber(user.lastseen)) user.lastseen = 0
        if (!isNumber(user.exp)) user.exp = 0
        if (!isNumber(user.limit)) user.limit = 10
        if (!isNumber(user.lastclaim)) user.lastclaim = 0
        if (!isNumber(user.spam)) user.spam = 0
        if (!isNumber(user.price)) user.price = 0
        if (!isNumber(user.premiumDate)) user.premiumDate = 0
        if (!isNumber(user.afk)) user.afk = -1
      } else global.DATABASE._data.users[m.sender] = {
        lastseen: 0,
        exp: 0,
        limit: 10,
        lastclaim: 0,
        warning: 0,
        afk: -1,
        afkReason: '',
        pasangan: '',
        premium: false,
        premiumDate: 0,
        command: 0,
        job: "x",
        price: 0,
        whitelist: false,
        isBanned: false,
        spam: 0
      }

      let chat
      if (chat = global.DATABASE._data.chats[m.chat]) {
        if (!'isBanned' in chat) chat.isBanned = false
        if (!'welcome' in chat) chat.welcome = false
        if (!'left' in chat) chat.left = false
        if (!'warningGroup' in chat) chat.warningGroup = false
        if (!'nolink' in chat) chat.nolink = false
        if (!'novirtex' in chat) chat.novirtex = false
        if (!'sWelcome' in chat) chat.sWelcome = ''
        if (!'sBye' in chat) chat.sBye = ''
      } else global.DATABASE._data.chats[m.chat] = {
        antiSpam: true,
        lastseen: 0,
        adminMode: false,
        isBanned: false,
        expired: 0,
        welcome: false,
        left: false,
        warningGroup: false,
        nolink: false,
        novirtex: false,
        nobadword: false,
        sWelcome: '',
        sBye: '',
        command: 0,
        expired: 0
      }

      if (global.DATABASE._data.users[m.sender]) {
        if (!'isBanned' in global.DATABASE._data.users[m.sender])
          global.DATABASE._data.users[m.sender].isBanned = false
      } else global.DATABASE._data.users[m.sender] = {
        isBanned: false
      }

    } catch (e) {
      console.log(e, global.DATABASE.data)
    }
    if (!m.fromMe && opts['self']) return
    if (!m.text) return
    if (m.isBaileys) return
    m.exp += 0

    let _user = global.DATABASE.data && global.DATABASE.data.users && global.DATABASE.data.users[m.sender]
    let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    let isOwner = isROwner || m.fromMe
    let isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    let groupMetadata = m.isGroup ? await this.groupMetadata(m.chat) : {}
    let participants = m.isGroup ? groupMetadata.participants : []
    let user = m.isGroup ? participants.find(u => u.jid == m.sender) : {}
    let bot = m.isGroup ? participants.find(u => u.jid == this.user.jid) : {}
    let isAdmin = user.isAdmin || user.isSuperAdmin || false
    let isBotAdmin = bot.isAdmin || bot.isSuperAdmin || false
    let enable = global.DATABASE._data.chats[m.chat]
    let groupMode = global.DATABASE.data.groupMode
    let selfMode = global.DATABASE.data.selfMode
    let adminMode = global.DATABASE.data.chats[m.chat].adminMode
    let whitelist = global.DATABASE._data.users[m.sender].whitelist
    let isPrems = global.DATABASE._data.users[m.sender].premium
    let antiSpam = global.DATABASE.data.chats[m.chat].antiSpam
    let pasangan = global.DATABASE._data.users[m.sender].pasangan
    let owner = global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || m.fromMe


    await conn.chatRead(m.chat)

    // GROUP ONLY == TRUE
    var userPrefix = m.text.slice(0, 1);

    if (!m.isGroup && !owner && !isPrems && groupMode && userPrefix == prefixhl) {
      var head = '*[ GROUP MODE ]*\n\nSilahkan masuk ke grup untuk menggunakan bot atau daftar premium untuk menggunakan bot di personal chat.'
      var undang = "Bot Join GC ? Daftar User Premium ? Chat owner bot"
      var ig = "Info Bot : instagram.com/loadingtomastah"
      var grup = []
      // gc utama
      grup[0] = 'https://chat.whatsapp.com/' + (await conn.groupInviteCode('6285892821182-1510584700@g.us'))
      grup[1] = 'https://chat.whatsapp.com/' + (await conn.groupInviteCode('6282245496356-1602153905@g.us'))
      acak = getRandom(0, 1)
      if (new Date - global.DATABASE.data.users[m.sender].lastclaim > 86400000) {
        global.DATABASE.data.users[m.sender].lastclaim = new Date * 1
        return conn.reply(m.chat, `${head}\n\n${grup[acak]}\n\n${ig}\n\n${undang}`, m).then(() => {
          conn.updatePresence(m.chat, Presence.composing)
          let name = 'Hairul Lana'
          let number = global.owner[0]
          conn.sendVcard(m.chat, name, number)
        })
      } else {
        return conn.reply(m.chat, head + "\n\n" + undang, m).then(() => {
          conn.updatePresence(m.chat, Presence.composing)
          let name = 'Hairul Lana'
          let number = global.owner[0]
          conn.sendVcard(m.chat, name, number)
        })
      }
    }

    if (enable.warningGroup == true) {
      if (enable.warningGroup && m.isGroup && !isAdmin && isBotAdmin) {
        if (!m.fromMe && !whitelist && m.text.match(/(bitch|keparat|fuck|bastard|anjing|babi|pantek|bajingan|coli|colmek|pukimak|lonte|dongo|biadab|biadap|ngocok|toket|tempek|tomlol|henceut|kanjut|oppai|tetek|kanyut|itil|titit|tytyd|tolol|idiot|bangsat|bangsad|pucek|kontol|pantek|memek|puki|jembut|meki|jingan|bodoh|goblok|bokep|dajjal|silit|setan|sange|jancok|dancok|goblog|autis|bagong|peler|ngentot|ngentod|ngewe|pler|ngtd|kntl|ajg|njing|njeng|kafir|xnxx|xvideos|crot)/gi)) {
          conn.updatePresence(m.chat, Presence.composing)
          var cBad = global.DATABASE.data.users[m.sender].warning += 1
          var warning = global.DATABASE.data.users[m.sender].warning
          if (warning > 4) {
            conn.reply(m.chat, `*[ MEMBER WARNING ]*\n\n@${m.sender.split('@')[0]} sudah mendapatkan peringatan 5x ! Kick ae lah ajg !`, m, {
              contextInfo: {
                mentionedJid: [m.sender]
              }
            }).then(() => {
              conn.groupRemove(m.chat, [m.sender])
              global.DATABASE.data.users[m.sender].warning = 0
            })
          } else {
            conn.reply(m.chat, `*[ MEMBER WARNING ]*\n\n@${m.sender.split('@')[0]} : [ ${warning} / 5 ]\n\nJangan berkata kasar !\nJika kamu mendapatkan peringatan sampai 5x, maka kamu akan di kick!\n\nKetik *.delwarn* untuk menghapus warning dengan membayar limit`, m, {
              contextInfo: {
                mentionedJid: [m.sender]
              }
            })
          }
        }
      }
    }

    if (global.DATABASE.data.users[m.sender].isBanned) return

    // partisipasi
    global.DATABASE.data.chats[m.chat].lastseen = new Date() * 1
    if (global.DATABASE.data.users[m.sender].isBanned == false) {
      global.DATABASE.data.users[m.sender].exp += 1000
      global.DATABASE.data.users[m.sender].lastseen = new Date() * 1
    }

    // Keluar GC Otomatis Sesuai Tanggal
    var now = new Date() * 1
    if (m.isGroup && global.DATABASE.data.chats[m.chat].expired != 0) {
      if (now >= global.DATABASE.data.chats[m.chat].expired) {
        conn.reply(m.chat, "*Maaf waktunya bot untuk meninggalkan grup :(*\n*Chat owner untuk invite bot lagi*").then(() => {
          conn.updatePresence(m.chat, Presence.composing)
          let name = 'Hairul Lana'
          let number = global.owner[0]
          conn.sendVcard(m.chat, name, number).then(() => {
            conn.groupLeave(m.chat).then(() => {
              global.DATABASE.data.chats[m.chat].expired = 0
            })
          })
        })

      }
    }

    if (isPrems) {
      if (now >= global.DATABASE.data.users[m.sender].premiumDate) {
        conn.reply(m.chat, "*Maaf waktu untuk status premium anda telah berakhir :(*\n*Chat owner untuk upgrade premium lagi*", m).then(() => {
          global.DATABASE.data.users[m.sender].premium = false
          conn.updatePresence(m.chat, Presence.composing)
          let name = 'Hairul Lana'
          let number = global.owner[0]
          conn.sendVcard(m.chat, name, number)
        })

      }
    }

    // anu
    // let list = Object.entries(global.DATABASE.data.users)
    // list.slice(0, list.length).map(([user, data], i) => (Number(data.exp -= Math.floor((data.exp/100)*50))))

    // anti spam
    if (antiSpam){
      if (!m.fromMe && !owner) {
        global.DATABASE.data.users[m.sender].spam += 1
        var spam = global.DATABASE.data.users[m.sender].spam
  
        if (spam >= 0) setTimeout(() => {
          global.DATABASE.data.users[m.sender].spam = 0
        }, 7000)
  
        if (spam == 5) return conn.reply(m.chat, `*[ SPAM DETECTED ]*\n\nTolong @${m.sender.split('@')[0]} untuk tidak spam !`, null, {
          contextInfo: {
            mentionedJid: [m.sender]
          }
        })
  
        if (spam == 7) {
          if (m.isGroup && isBotAdmin) {
            conn.updatePresence(m.chat, Presence.composing)
            return conn.reply(m.chat, `*[ OVER SPAM DETECTED ]*\n\nBot akan menutup grup untuk menghindari spam`, m).then(() => {
              if (isAdmin && m.isGroup) {
                conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, true).then(() => {
                  conn.groupDemoteAdmin(m.chat, [m.sender])
                })
              } else if (m.isGroup) {
                conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, true)
              }
              conn.reply(m.chat, `*Anda mau dikick ?*`, m)
            })
          }else if(!m.isGroup) {
            conn.updatePresence(m.chat, Presence.composing)
            return conn.reply(m.chat, `*[ OVER SPAM DETECTED ]*\n\nMaaf kamu di banned dari bot !`, m).then(() => {
              global.DATABASE.data.users[m.sender].spam = 0
              global.DATABASE.data.users[m.sender].isBanned = true
              global.DATABASE.data.banned += 1
            })
          }
        }
      }
    }


    // ANTI-SPAM COMMAND
    if (m.text.slice(0, 1) == prefixhl) {
      global.DATABASE.data.chats[m.chat].command += 1
    }
    let cmd = global.DATABASE.data.chats[m.chat].command
    if (cmd >= 1) setTimeout(() => {
      global.DATABASE.data.chats[m.chat].command = 0
    }, 7500)
    if (cmd <= 1) {
      if (!m.fromMe && !owner && opts['self']) return
    } else {
      if (!m.fromMe && !owner && !opts['self']) return
    }

    if (m.text == prefixhl && (owner || m.fromMe)) {
      // let old = performance.now()
      // let neww = performance.now()
      let old = new Date

      var groupTotal = 0
      conn.chats.array.filter(v => v.jid.endsWith('us')).map(v => groupTotal += 1)

      var chatTotal = 0
      conn.chats.array.filter(v => v.jid.endsWith('net')).map(v => chatTotal += 1)

      if (global.DATABASE.data.selfMode) {
        var selfModeText = "Aktif"
      } else {
        var selfModeText = "Tidak Aktif"
      }

      if (global.DATABASE.data.groupMode) {
        var groupModeText = "Aktif"
      } else {
        var groupModeText = "Tidak Aktif"
      }

      let uptime = clockString(process.uptime() * 1000)

      let totalUser = format(Object.keys(global.DATABASE._data.users).length)

      let users = global.DATABASE.data.users
      let anu = 86400000 * 10 
      let now = new Date() * 1
      var userBangsat = 0
      var userPremium = 0
      var userWhitelist = 0

      for (let jid in users) {
        if (now - users[jid].lastseen > anu && !users[jid].whitelist) userBangsat += 1
        if (users[jid].premium) userPremium += 1
        if (users[jid].whitelist) userWhitelist += 1
      }

      let userAktif = format(Object.keys(global.DATABASE._data.users).length - userBangsat)

      await m.reply("_Checking . . ._")
      conn.reply(m.chat, `*Speed :* ${new Date - old} ms\n\n*Self Mode :* ${selfModeText}\n*Group Mode :* ${groupModeText}\n*Group :* ${groupTotal} grup\n*Chat :* ${chatTotal} chat\n*Total User :* ${totalUser} user\n*User Aktif :* ${userAktif} user\n*Premium :* ${userPremium} user\n*Whitelist :* ${userWhitelist} user\n*Banned :* ${global.DATABASE.data.banned} user\n*Uptime :* ${uptime}`, m)
      // conn.reply(m.chat,`*[ BOT STATUS ]*\n\n*Status* : Best Performance\n*Ping :* ${(neww-old)} ms\n\n*Device :* ASUS ROG STRIX GL503\n*Processor :* Intel® Core™ i7-8750H 4.2 GHz\n*Memory :* 11.43GB / 32GB\n*Hard Drive :* 2TB SSD\n*Graphic :* NVIDIA® GeForce® GTX1050Ti 4GB GDDR5 VRAM`,m)
    }

    if ((m.text == "y" || m.text == "Y") && (owner || m.fromMe)) {
      ran = "media/desah-bangsat.mp3"
      buffer = fs.readFileSync(ran)
      const option = {
        quoted: m,
        mimetype: 'audio/mp4',
        ptt: true
      }
      conn.voice(m.chat, buffer, option)
    }

    if (enable.nolink == true && !whitelist) {
      var linkGC = 'chat.whatsapp.com/' + (conn.groupInviteCode(m.chat))
      if (m.isGroup && !isAdmin && isBotAdmin) {
        if (m.text.match(/(chat.whatsapp.com)/gi)) {
          conn.groupRemove(m.chat, [m.sender], m)
          // conn.reply(m.chat,`*[ LINK DETECTOR ]*\n\nSorry motherfucker, you will be removed from this group !`,m).then(() => {
          // conn.groupRemove(m.chat, [m.sender],m)
          // })
        }
      }
    }

    if (m.text.match(/(@62)/gi) && !m.fromMe && m.text.slice(0, 1) != prefixhl) {
      var xxx = m.text.split(' ')
      var jancok
      for (i = 0; i < xxx.length; i++) {
        if (xxx[i].match(/(@62)/gi)) {
          jancok = xxx[i]
          // conn.reply(m.chat, jancok, m)
          jancok = jancok.replace(/@/g, '')
          // conn.reply(m.chat, jancok, m)
          i = xxx.length
        }
      }
      // return conn.reply(m.chat, jancok, m)
      var bebeb = jancok + "@s.whatsapp.net"
      if (!m.fromMe && global.DATABASE.data.users[bebeb].pasangan !== "") {
        var ayang = global.DATABASE.data.users[bebeb].pasangan

        if (global.DATABASE.data.users[bebeb].pasangan == ayang && global.DATABASE.data.users[ayang].pasangan == bebeb && m.sender != bebeb) {
          if (m.sender != ayang) {
            var denda = 1
            var nominalDenda = Math.ceil((global.DATABASE.data.users[m.sender].exp / 100) * denda)
            global.DATABASE.data.users[m.sender].exp -= nominalDenda
            conn.reply(m.chat, `*Hey njing ngapain ngetag ngetag bebebnya si @${ayang.split('@')[0]} 😠😠😠 gatelan amat !!!*\n\n*Denda Rp. ${format(nominalDenda)} (${denda}%)*`, m, {
              contextInfo: {
                mentionedJid: [ayang]
              }
            })
          }
        }
      }
    }

    if (enable.novirtex == true) {
      if (!m.fromMe && m.isGroup && !isAdmin && isBotAdmin) {
        if (m.text.match(/(৭৭৭৭৭৭৭৭|๒๒๒๒๒๒๒๒|๑๑๑๑๑๑๑๑|ดุท้่เึางืผิดุท้่เึางื|𐎑⃢𝘼𝙩𝙩𝙖𝙘𝙠|۩꦳|ผิดุท้เึางื)/gi)) {
          conn.updatePresence(m.chat, Presence.composing)
          conn.reply(m.chat, `${virtex}`, m).then(() => {
            conn.groupRemove(m.chat, [m.sender], m).then(() => {
              conn.reply(m.chat, `Tanda Telah Dibaca Dulu Ya Ngntd Biar Ga Lag !\nTerus Clear Chat !`)
            })
          })
        }
      }
    }


    if (!m.fromMe && !selfMode && global.DATABASE.data.chats[m.chat].isBanned == false && global.DATABASE.data.users[m.sender].isBanned == false) {
      if (m.text.match(/(asalam|assalam)/gi)) {
        conn.updatePresence(m.chat, Presence.composing)
        conn.reply(m.chat,`*Waalaikumussalam Warahmatullahi Wabarakatuh.*`,m)
        // conn.sendFile(m.chat, 'media/waalaikumussalam.opus', 'tts.opus', null, m, true)
      } else if (m.text == "menu" || m.text == "help" || m.text == "?menu" || m.text == "#menu" || m.text == "+menu" || m.text == "#help" || m.text == "+help" || m.text == "!help" || m.text == "!menu" || m.text == "/help" || m.text == "/menu" || m.text == "?help" || m.text == "*menu" || m.text == "*help" || m.text == "bot" || m.text == ".bot" || m.text == "*bot" || m.text == "!bot" || m.text == "?bot" || m.text == "#bot" || m.text == "Menu" || m.text == "Help" || m.text == "Bot" || m.text == "+bot") {
        conn.updatePresence(m.chat, Presence.composing)
        conn.reply(m.chat, `Ketik .menu untuk melihat menu bot`, m)
      }
      // else if (m.text.match(/(hairul|lana|loli)/gi)) {
      //   conn.updatePresence(m.chat, Presence.composing)
      //   conn.sendFile(m.chat, 'media/hairul-punya-loli.ogg', 'tts.opus', null, m, true)
      //   // conn.sendFile(m.chat, 'media/hl.opus', 'tts.opus', null, m, true)
      //   // conn.sendFile(m.chat, 'media/hl1.opus', 'tts.opus', null, m, true)
      //   // conn.sendFile(m.chat, 'media/hl2.opus', 'tts.opus', null, m, true)
      //   // conn.sendFile(m.chat, 'media/hl3.opus', 'tts.opus', null, m, true)
      //   // conn.sendFile(m.chat, 'media/hl4.opus', 'tts.opus', null, m, true)
      //   // conn.sendFile(m.chat, 'media/hl5.opus', 'tts.opus', null, m, true)
      //   // conn.sendFile(m.chat, 'media/hl6.opus', 'tts.opus', null, m, true)
      //   // conn.sendFile(m.chat, 'media/hl7.opus', 'tts.opus', null, m, true)
      //   // conn.sendFile(m.chat, 'media/hl8.opus', 'tts.opus', null, m, true)
      //   // conn.sendFile(m.chat, 'media/hl-muah.opus', 'tts.opus', null, m, true)
      // }
      // else if (m.text.match(/(wildan)/gi)){
      //   conn.sendFile(m.chat, 'media/wildan-gay.opus', 'tts.opus', null, m, true)
      // }
    }

    


    function getRandom(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    if (!m.fromMe && !owner && selfMode && userPrefix == prefixhl) return

    if (!m.fromMe && !owner && adminMode && m.isGroup && !isAdmin && userPrefix == prefixhl) return

    let usedPrefix
    for (let name in global.plugins) {
      let plugin = global.plugins[name]
        if (!plugin) continue
        if (plugin.disabled) continue
        if (!opts['restrict']) if (plugin.tags && plugin.tags.includes('admin')) continue
        const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
        let match = (_prefix instanceof RegExp ? // RegExp Mode?
          [[_prefix.exec(m.text), _prefix]] :
          Array.isArray(_prefix) ? // Array?
            _prefix.map(p => {
              let re = p instanceof RegExp ? // RegExp in Array?
                p :
                new RegExp(str2Regex(p))
              return [re.exec(m.text), re]
            }) :
            typeof _prefix === 'string' ? // String?
              [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
              [[[], new RegExp]]
        ).find(p => p[1])
        if (typeof plugin.before == 'function') if (await plugin.before.call(this, m, {
          match,
          conn: this,
          participants,
          groupMetadata,
          user,
          bot,
          isROwner,
          isOwner,
          isAdmin,
          isBotAdmin,
          isPrems
        })) continue
        if ((usedPrefix = (match[0] || '')[0])) {
          let noPrefix = m.text.replace(usedPrefix, '')
          let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
          args = args || []
          let _args = noPrefix.trim().split` `.slice(1)
          let text = _args.join` `
          command = (command || '').toLowerCase()
          let fail = plugin.fail || global.dfail // When failed
          let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
            plugin.command.test(command) :
            Array.isArray(plugin.command) ? // Array?
              plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                cmd.test(command) :
                cmd === command
              ) :
              typeof plugin.command === 'string' ? // String?
                plugin.command === command :
                false

          if (!isAccept) continue
          m.plugin = name
          if (m.chat in global.DATABASE._data.chats || m.sender in global.DATABASE._data.users) {
            let chat = global.DATABASE._data.chats[m.chat]
            let user = global.DATABASE._data.users[m.sender]
            if (name != 'on.js' && chat && chat.isBanned) return // Except this
            if (name != 'me.js' && user && user.banned) return
          }
          if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
            fail('owner', m, this)
            continue
          }
          if (plugin.rowner && !isROwner) { // Real Owner
            fail('rowner', m, this)
            continue
          }
          if (plugin.owner && !isOwner) { // Number Owner
            fail('owner', m, this)
            continue
          }
          if (plugin.mods && !isMods) { // Moderator
            fail('mods', m, this)
            continue
          }
          if (plugin.premium && !isPrems) { // Premium
            fail('premium', m, this)
            continue
          }
          if (plugin.group && !m.isGroup) { // Group Only
            fail('group', m, this)
            continue
          } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
            fail('botAdmin', m, this)
            continue
          } else if (plugin.admin && !isAdmin) { // User Admin
            fail('admin', m, this)
            continue
          }
          if (plugin.private && m.isGroup) { // Private Chat Only
            fail('private', m, this)
            continue
          }
          if (plugin.register == true && _user.registered == false) { // Butuh daftar?
            fail('unreg', m, this)
            continue
          }


        m.isCommand = true
        let xp = 'exp' in plugin ? parseInt(plugin.exp) : 50 // XP Earning per command
        // m.exp += xp
        if (!isPrems && global.DATABASE._data.users[m.sender].limit < 1 && plugin.limit && !owner && !m.fromMe) {
          this.reply(m.chat, `*[ LIMIT HABIS ]*\n\nCara mendapatkan limit :\n\n1. Beli limit menggunakan command *.buy _total_*\n2. Claim hadian harian dengan command *.claim* !\n3. Mengemis limit/saldo kepada user sultan`, m)
          continue // Limit habis
        }
        try {
          await plugin(m, {
            usedPrefix,
            noPrefix,
            _args,
            args,
            command,
            text,
            conn: this,
            participants,
            groupMetadata,
            isROwner,
            isOwner,
            isAdmin,
            isBotAdmin,
            isPrems
          })
          if (!isPrems) m.limit = m.limit || plugin.limit || false
        } catch (e) {
          // Error occured
          m.error = e
          console.log(e)
          m.reply(util.format(e))
        } finally {
          // if (m.limit) m.reply('*Limit terpakai.*')
        }
        break
      }
    }
  } finally {
    //console.log(global.DATABASE._data.users[m.sender])
    let user
    if (m && m.sender && (user = global.DATABASE._data.users[m.sender])) {
      // user.exp += m.exp
      var limitAsli
      if (global.DATABASE._data.users[m.sender].limit > 11000000000000) {
        limitAsli = 10000000000000
      } else if (global.DATABASE._data.users[m.sender].limit > 1100000000000) {
        limitAsli = 1000000000000
      } else if (global.DATABASE._data.users[m.sender].limit > 110000000000) {
        limitAsli = 100000000000
      } else if (global.DATABASE._data.users[m.sender].limit > 11000000000) {
        limitAsli = 10000000000
      } else if (global.DATABASE._data.users[m.sender].limit > 1100000000) {
        limitAsli = 1000000000
      } else if (global.DATABASE._data.users[m.sender].limit > 110000000) {
        limitAsli = 100000000
      } else if (global.DATABASE._data.users[m.sender].limit > 11000000) {
        limitAsli = 10000000
      } else if (global.DATABASE._data.users[m.sender].limit > 1100000) {
        limitAsli = 1000000
      } else if (global.DATABASE._data.users[m.sender].limit > 110000) {
        limitAsli = 100000
      } else if (global.DATABASE._data.users[m.sender].limit > 11000) {
        limitAsli = 10000
      } else if (global.DATABASE._data.users[m.sender].limit > 1100) {
        limitAsli = 1000
      } else if (global.DATABASE._data.users[m.sender].limit > 110) {
        limitAsli = 100
      } else if (global.DATABASE._data.users[m.sender].limit > 30) {
        limitAsli = 10
      } else if (global.DATABASE._data.users[m.sender].limit > 5) {
        limitAsli = 5
      } else if (global.DATABASE._data.users[m.sender].limit > 1) {
        limitAsli = 2
      } else(
        limitAsli = 1
      )
      // user.limit -= limitAsli
      if (user.premium == true) {
        user.limit -= m.limit * 1
      } else if (user.limit > 30 || user.exp > 100000000) {
        user.limit -= m.limit * limitAsli
      } else {
        user.limit -= m.limit * 1
      }
      // user.limit -= m.limit
      // conn.reply(m.chat,`@${m.sender.split('@')[0]} berhasil menggunakan ${format(limitAsli)}\n\nSisa limit : ${format(global.DATABASE._data.users[m.sender].limit)}`,{contextInfo: {
      // mentionedJid: [m.sender]
      // }})
    }
    try {
      require('./lib/print')(m, this)
    } catch (e) {
      console.log(m, m.quoted, e)
    }
  }
}

conn.welcome = 'Hai, *@user* !\nSelamat datang di grup *@subject*'
conn.bye = 'Selamat Tinggal *@user* !'
conn.onAdd = async function ({
  m,
  participants
}) {
  let chat = global.DATABASE._data.chats[m.key.remoteJid]
  if (!chat.welcome) return
  for (let user of participants) {
    let pp = './src/avatar_contact.png'
    try {
      pp = await this.getProfilePicture(user)
    } catch (e) {} finally {
      let text = (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@user', '@' + user.split('@')[0]).replace('@subject', this.getName(m.key.remoteJid))
      if (user != conn.user.jid) {
        this.sendFile(m.key.remoteJid, pp, 'pp.jpg', text, m, false, {
          contextInfo: {
            mentionedJid: [user]
          }
        })
      }
    }
  }
}

conn.onLeave = async function ({
  m,
  participants
}) {
  let chat = global.DATABASE._data.chats[m.key.remoteJid]
  if (!chat.left) return
  for (let user of participants) {
    if (this.user.jid == user) continue
    let pp = './src/avatar_contact.png'
    try {
      pp = await this.getProfilePicture(user)
    } catch (e) {} finally {
      let text = (chat.sBye || this.bye || conn.bye || 'Selamat tinggal, @user!').replace('@user', '@' + user.split('@')[0]).replace('@subject', this.getName(m.key.remoteJid))
      this.sendFile(m.key.remoteJid, pp, 'pp.jpg', text, m, false, {
        contextInfo: {
          mentionedJid: [user]
        }
      })
    }
  }
}

// conn.onDelete = async function (m) {
//   await this.reply(m.key.remoteJid, `*⺀ DELETING MESSAGE ⺀*\n\n	○ *Dari :* @${m.participant.split`@`[0]}\n\n*Tunggu sebentar BOT akan mengembalikan pesan . . .*\n\n▌│█║▌║▌║║▌║▌║█│▌▌│█║`, m.message, {
//     contextInfo: {
//       mentionedJid: [m.participant]
//     }
//   })
//   await conn.updatePresence(m.chat, Presence.composing) 
//   this.copyNForward(m.key.remoteJid, m.message).catch(e => console.log(e, m))
// }

conn.on('message-new', conn.handler)
// conn.on('message-delete', conn.onDelete)
conn.on('group-add', conn.onAdd)
conn.on('group-leave', conn.onLeave)
conn.on('error', conn.logger.error)
conn.on('close', async () => {
  if (conn.state == 'close') {
    await conn.loadAuthInfo(authFile)
    await conn.connect()
    global.timestamp.connect = new Date
  }
})

global.dfail = (type, m, conn) => {
  let msg = {
    rowner: '*[ ERROR COMMAND ]*\n\nHanya owner yang dapat menggunakan perintah ini !',
    owner: '*[ ERROR COMMAND ]*\n\nHanya owner yang dapat menggunakan perintah ini !',
    mods: '*[ ERROR COMMAND ]*\n\nHanya owner yang dapat menggunakan perintah ini !',
    premium: '*[ ERROR COMMAND ]*\n\nFitur ini khusus untuk user premium !\nHubungi owner ( *.owner* ) untuk upgrade premium',
    group: '*[ ERROR COMMAND ]*\n\nPerintah ini hanya dapat digunakan didalam grup !',
    private: '*[ ERROR COMMAND ]*\n\nPerintah ini hanya dapat digunakan di privat chat !',
    admin: '*[ ERROR COMMAND ]*\n\nFitur ini khusus untuk admin grup !',
    botAdmin: '*[ ERROR COMMAND ]*\n\nPerintah ini akan hanya dapat digunakan ketika BOT menjadi admin !'
  } [type]
  if (msg) conn.reply(m.chat, msg, m)
}

if (opts['test']) {
  conn.user = {
    jid: '2219191@s.whatsapp.net',
    name: 'test',
    phone: {}
  }
  conn.sendMessage = (chatId, content, type, opts) => conn.emit('message-new', {
    messageStubParameters: [],
    key: {
      fromMe: true,
      remoteJid: chatId,
      id: opts ? '3EB0ABCDEF45' : 'biasa'
    },
    message: {
      [type]: content
    },
    messageStubType: 0,
    timestamp: +new Date
  })
  process.stdin.on('data', chunk => conn.sendMessage('123@s.whatsapp.net', chunk.toString().trimEnd(), 'conversation'))
} else {
  process.stdin.on('data', chunk => {
    global.DATABASE.save()
    process.send(chunk.toString().trimEnd())
  })
  conn.connect().then(() => {
    global.timestamp.connect = new Date
  })
}
process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = Object.fromEntries(
  fs.readdirSync(path.join(__dirname, 'plugins'))
  .filter(pluginFilter)
  .map(filename => [filename, {}])
)
for (let filename in global.plugins) {
  try {
    global.plugins[filename] = require('./plugins/' + filename)
  } catch (e) {
    conn.logger.error(e)
    delete global.plugins[filename]
  }
}
console.log(Object.keys(global.plugins))
global.reload = (event, filename) => {
  if (pluginFilter(filename)) {
    let dir = './plugins/' + filename
    if (require.resolve(dir) in require.cache) {
      delete require.cache[require.resolve(dir)]
      if (fs.existsSync(require.resolve(dir))) conn.logger.info(`re - require plugin '${dir}'`)
      else {
        conn.logger.warn(`deleted plugin '${dir}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`requiring new plugin '${dir}'`)
    let err = syntaxerror(fs.readFileSync(dir))
    if (err) conn.logger.error(`syntax error while loading '${dir}'\n${err}`)
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      conn.logger.error(e)
    }
  }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'plugins'), global.reload)

process.on('exit', () => global.DATABASE.save())