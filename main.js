let { WAConnection: _WAConnection, WA_MESSAGE_STUB_TYPES, Presence, MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys')
let { generate } = require('qrcode-terminal')
let qrcode = require('qrcode')
let simple = require('./lib/simple')
let yargs = require('yargs/yargs')
let syntaxerror = require('syntax-error')
let chalk = require('chalk')
let fs = require('fs')
let path = require('path')
let util = require('util')
let WAConnection = simple.WAConnection(_WAConnection)


global.owner = ['6283119526456'] // Put your number here
global.mods = [] // Want some help?
global.prems = [] // Premium user has unlimited limit
global.APIs = { // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',
  xteam: 'https://api.xteam.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'test'
}
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '')
global.timestamp = {
  start: new Date
}
const PORT = process.env.PORT || 3000
let opts = yargs(process.argv.slice(2)).exitProcess(false).parse()
global.opts = Object.freeze({...opts})
global.prefix = new RegExp('^[' + (opts['prefix'] || '.') + ']')

// set db awal
global.DATABASE = new (require('./lib/database'))(opts._[0] ? opts._[0] + '_' : '' + 'database.json', null, 2)
if (!global.DATABASE.data.users) global.DATABASE.data = {
  users: {},
  groups: {},
  chats: {},
  blocked: 0,
  banned: 0
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
if (opts['big-qr'] || opts['server']) conn.on('qr', qr => generate(qr, { small: false }))
if (opts['server']) conn.on('qr', qr => { global.qr = qr })
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
}, 60 * 1000) // Save every 1 second
conn.handler = async function (m) {

try {
	simple.smsg(this, m)
    m.exp = 0
    m.limit = false
    
    try {
      const isNumber = x => typeof x === 'number' && !isNaN(x)
      let user
      if (user = global.DATABASE._data.users[m.sender]) {
        if (!isNumber(user.exp)) user.exp = 0
        if (!isNumber(user.limit)) user.limit = 10
        if (!isNumber(user.lastclaim)) user.lastclaim = 0
        if (!isNumber(user.spam)) user.spam = 0
      } else global.DATABASE._data.users[m.sender] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        warning: 0,
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
        isBanned: false,
        welcome: false,
        left: false,
        warningGroup: false,
        nolink: false,
        novirtex: false,
        sWelcome: '',
        sBye: ''
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
    
  let groupMetadata = m.isGroup ? await this.groupMetadata(m.chat) : {}
  let participants = m.isGroup ? groupMetadata.participants : []
  let user = m.isGroup ? participants.find(u => u.jid == m.sender) : {}
  let bot = m.isGroup ? participants.find(u => u.jid == this.user.jid) : {}
  let isAdmin = user.isAdmin || user.isSuperAdmin || false
  let isBotAdmin = bot.isAdmin || bot.isSuperAdmin || false  
	let enable = global.DATABASE._data.chats[m.chat]

  // anti spam
  if(!m.fromMe && global.DATABASE.data.users[m.sender].whitelist == false) {
		global.DATABASE.data.users[m.sender].spam += 1
		var spam = global.DATABASE.data.users[m.sender].spam

		if(spam >= 0) setTimeout(() => {
      global.DATABASE.data.users[m.sender].spam = 0
    }, 10000)

    if(spam == 10) return conn.reply(m.chat, `*[ SPAM DETECTED ]*\n\nTolong @${m.sender.split('@')[0]} untuk tidak spam, atau anda akan di banned !`, null, {contextInfo: { mentionedJid: [m.sender] }})

    if (spam == 15){
      if(m.isGroup && !isAdmin && isBotAdmin) {
        conn.updatePresence(m.chat, Presence.composing) 
        return conn.reply(m.chat, `*[ OVER SPAM DETECTED ]*\n\nMaaf kamu di kick dari grup !`, m).then(() => {
          conn.groupRemove(m.chat, [m.sender])
          global.DATABASE.data.users[m.sender].spam = 0
          global.DATABASE.data.users[m.sender].isBanned = true
        })
      }else if(m.isGroup && isAdmin && isBotAdmin) {
        conn.updatePresence(m.chat, Presence.composing) 
        return conn.reply(m.chat, `*[ OVER SPAM DETECTED ]*\n\nMaaf kamu di banned dari bot!`, m).then(() => {
          global.DATABASE.data.users[m.sender].spam = 0
          global.DATABASE.data.users[m.sender].isBanned = true
        })
      }else if (m.isGroup && !isBotAdmin){
        conn.updatePresence(m.chat, Presence.composing) 
        return conn.reply(m.chat, `*[ OVER SPAM DETECTED ]*\n\nMaaf kamu di banned dari bot!`, m).then(() => {
          global.DATABASE.data.users[m.sender].spam = 0
          global.DATABASE.data.users[m.sender].isBanned = true
        })
      }else if (!m.isGroup){
        conn.updatePresence(m.chat, Presence.composing) 
        return conn.reply(m.chat, `*[ OVER SPAM DETECTED ]*\n\nMaaf kamu di banned dari bot !`, m).then(() => {
          global.DATABASE.data.users[m.sender].isBanned = true
        })
      }
    }
    
    //else if (m.isGroup && !isAdmin && !status.isBanned && spam == 7) {
    //   global.DATABASE._data.users[m.sender].isBanned = true
    //   global.DATABASE._data.banned += 1
    //   global.DATABASE._data.users[m.sender].isBlocked = true
    //   conn.blockUser (m.sender, "add")
    //   global.DATABASE._data.blocked += 1
    //   return conn.reply(m.chat, `*Over spam!, nomormu telah dimasukkan kedalam banned list.*`, m)
    // }

	}
	
  if(enable.nolink == true) {  
    if(m.isGroup && !isAdmin && isBotAdmin) {
      if (m.text.match(/(chat.whatsapp.com)/gi)) {
        conn.reply(m.chat,`*[ LINK DETECTOR ]*\n\nSorry motherfucker, you will be removed from this group !`,m).then(() => {
        conn.groupRemove(m.chat, [m.sender],m)
        })
      }
    }
  }
     
  if(enable.warningGroup == true) {  
    if(enable.warningGroup && m.isGroup && !isAdmin && isBotAdmin) {
      if (!m.fromMe && m.text.match(/(bitch|keparat|fuck|bastard|anjing|babi|pantek|bajingan|coli|colmek|anjim|pilat|pukimak|lonte|lont|dongo|biadab|biadap|ngocok|toket|anjas|tempek|tomlol|henceut|kanjut|oppai|tete|kanyut|itil|titit|tytyd|tolol|idiot|bangsat|bangsad|pucek|kontol|pantek|memek|puki|jembut|meki|jingan|bodoh|goblok|bokep|dajjal|silit|setan|sange|jancok|dancok|goblog|autis|bagong|peler|ngentot|ngentod|ngewe|pler|ngtd|kntl|ajg|ajig|asw|njing|njeng|kafir|xnxx|xvideos|redhub)/gi)) {
  	    conn.updatePresence(m.chat, Presence.composing) 
  	    var cBad = global.DATABASE.data.users[m.sender].badword += 1
  	    var badword = global.DATABASE.data.users[m.sender].badword
  		  if(badword > 4) {
  			  conn.reply(m.chat, `*[ MEMBER WARNING ]*\n\nSorry motherfucker, you will be removed from this group !`, m).then(() => {
  			    conn.groupRemove(m.chat, [m.sender])
  			    global.DATABASE.data.users[m.sender].badword = 0
          })
  		  } else {
  			  conn.reply(m.chat, `*[ MEMBER WARNING ]*\n\nYou get a warning : [ ${badword} / 5 ]\n\nDon't be toxic or I will removed you motherfucker !`, m)
  		  }
  	  }
    }
  } 
  
  if(enable.novirtex == true) {
    if(!m.fromMe && m.isGroup && !isAdmin && isBotAdmin) {
      if (m.text.match(/(৭৭৭৭৭৭৭৭|๒๒๒๒๒๒๒๒|๑๑๑๑๑๑๑๑|ดุท้่เึางืผิดุท้่เึางื)/gi)) {
        conn.updatePresence(m.chat, Presence.composing) 
        conn.reply(m.chat,`${virtex}`,m).then(() => {
          conn.groupRemove(m.chat, [m.sender],m).then(() =>{
            conn.reply(m.chat, `Hairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\nHairul Lana Gans\n`)
            conn.reply(m.chat, `Tanda Telah Dibaca Dulu Ya Ngntd Biar Ga Lag !\nTerus Clear Chat !`)
          })
        })
      }
    }
  }
   
  if(m.isGroup){
    if (m.text.match(/(mkasih|makasih|thanks|thx|mksih|mksi|makasi|mksh)/gi)) {
      conn.updatePresence(m.chat, Presence.composing) 
      conn.sendFile(m.chat, 'media/sama-sama.opus', 'tts.opus', null, m, true)
    }else if (m.text.match(/(asalam|assalam)/gi)) {
      conn.updatePresence(m.chat, Presence.composing) 
      conn.sendFile(m.chat, 'media/waalaikumussalam.opus', 'tts.opus', null, m, true)
    }else if (m.text == "menu" || m.text == "help"  || m.text ==  "?menu" || m.text ==  "#menu" || m.text == "+menu"  || m.text == ".help"  || m.text == "#help" || m.text ==  "+help" || m.text == "!help" || m.text == "!menu" || m.text == "/help" || m.text == "/menu" || m.text == "?help" || m.text == "*menu" || m.text == "*help" || m.text == "bot" || m.text == ".bot" || m.text == "*bot" || m.text == "!bot" || m.text == "?bot" || m.text == "#bot" || m.text == "Menu" || m.text == "Help" || m.text == "Bot" || m.text == "+bot" || m.text ==  "hi" || m.text ==  "Hi" || m.text ==  "Hai"  || m.text ==  "hai" || m.text ==  "hallo" || m.text ==  "Hallo" || m.text ==  "Halo" || m.text ==  "halo") {
      conn.updatePresence(m.chat, Presence.composing) 
      conn.reply(m.chat, `Ketik .menu untuk melihat menu bot`, m)
    }
    else if (m.text.match(/(hairul|lana)/gi)) {
      conn.updatePresence(m.chat, Presence.composing)
      // conn.sendFile(m.chat, 'media/hl.opus', 'tts.opus', null, m, true)
      // conn.sendFile(m.chat, 'media/hl2.opus', 'tts.opus', null, m, true)
      // conn.sendFile(m.chat, 'media/hl3.opus', 'tts.opus', null, m, true)
      // conn.sendFile(m.chat, 'media/hl4.opus', 'tts.opus', null, m, true)
      // conn.sendFile(m.chat, 'media/hl5.opus', 'tts.opus', null, m, true)
      // conn.sendFile(m.chat, 'media/hl6.opus', 'tts.opus', null, m, true)
      // conn.sendFile(m.chat, 'media/hl7.opus', 'tts.opus', null, m, true)
      conn.sendFile(m.chat, 'media/hl8.opus', 'tts.opus', null, m, true)
      // conn.sendFile(m.chat, 'media/hl-muah.opus', 'tts.opus', null, m, true)
    }
  }
    
  	let usedPrefix
  	for (let name in global.plugins) {
  	  let plugin = global.plugins[name]
      if (!plugin) continue
      if (plugin.tags && plugin.tags.includes('admin')) continue
      let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
  	  if ((usedPrefix = (_prefix.exec(m.text) || '')[0])) {
        let noPrefix = m.text.replace(usedPrefix, '')
  		  let [command, ...args] = noPrefix.trim().split` `.filter(v=>v)
        let _args = noPrefix.trim().split` `.slice(1)
        let text = _args.join` `
  		  command = (command || '').toLowerCase()
        let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        let isOwner = isROwner || m.fromMe

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
        let isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        let isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        let groupMetadata = m.isGroup ? await this.groupMetadata(m.chat) : {}
        let participants = m.isGroup ? groupMetadata.participants : []
        let user = m.isGroup ? participants.find(u => u.jid == m.sender) : {} // User Data
        let bot = m.isGroup ? participants.find(u => u.jid == this.user.jid) : {} // Your Data
        let isAdmin = user.isAdmin || user.isSuperAdmin || false // Is User Admin?
        let isBotAdmin = bot.isAdmin || bot.isSuperAdmin || false // Are you Admin?
        if (m.chat in global.DATABASE._data.chats) {
          let chat = global.DATABASE._data.chats[m.chat]
          if (name != 'on.js' && chat && chat.isBanned) return // Except this
        }
        
        if (m.sender in global.DATABASE._data.users) {
          let nomor = global.DATABASE._data.users[m.sender]
          if (name != 'me.js' && nomor && nomor.isBanned) return
        }
        
        if (plugin.before && plugin.before({
          usedPrefix
        })) return
        let fail = plugin.fail || global.dfail // When failed
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

        m.isCommand = true
        let xp = 'exp' in plugin ? parseInt(plugin.exp) : 50 // XP Earning per command
        m.exp += xp
          if (!isPrems && global.DATABASE._data.users[m.sender].limit < m.limit * 1 && plugin.limit) {
            this.reply(m.chat, `*[ EMPTY LIMIT ]*\n\nSilahkan beli limit menggunakan command *.buy _total_* !\nSesuaikan dengan uang anda, kalau miskin gada duit yaudah diem.`, m)
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
            // if (m.limit) m.reply(+ m.limit + ' Limit terpakai')
          }
          break
      }
  	}
  } finally {
    //console.log(global.DATABASE._data.users[m.sender])
    let user
    if (m && m.sender && (user = global.DATABASE._data.users[m.sender])) {
      user.exp += m.exp
      user.limit -= m.limit
      // user.limit -= m.limit * 1
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
conn.onAdd = async function ({ m, participants }) {
  let chat = global.DATABASE._data.chats[m.key.remoteJid]
  if (!chat.welcome) return
  for (let user of participants) {
    let pp = './src/avatar_contact.png'
    try {
      pp = await this.getProfilePicture(user)
    } catch (e) {
    } finally {
      let text = (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@user', '@' + user.split('@')[0]).replace('@subject', this.getName(m.key.remoteJid))
      this.sendFile(m.key.remoteJid, pp, 'pp.jpg', text, m, false, {
        contextInfo: {
          mentionedJid: [user]
        }
      })
    }
  }
}

conn.onLeave = async function  ({ m, participants }) {
  let chat = global.DATABASE._data.chats[m.key.remoteJid]
  if (!chat.left) return
  for (let user of participants) {
    if (this.user.jid == user) continue
    let pp = './src/avatar_contact.png'
    try {
      pp = await this.getProfilePicture(user)
    } catch (e) {
    }finally {
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
    owner : '*[ ERROR COMMAND ]*\n\nHanya owner yang dapat menggunakan perintah ini !',
		mods : '*[ ERROR COMMAND ]*\n\nHanya owner yang dapat menggunakan perintah ini !',
		premium : '*[ ERROR COMMAND ]*\n\nFitur ini khusus untuk user premium !',
		group : '*[ ERROR COMMAND ]*\n\nPerintah ini hanya dapat digunakan didalam grup !',
		private : '*[ ERROR COMMAND ]*\n\nPerintah ini hanya dapat digunakan di privat chat !',
		admin : '*[ ERROR COMMAND ]*\n\nFitur ini khusus untuk admin grup !',
		botAdmin : '*[ ERROR COMMAND ]*\n\nPerintah ini akan hanya dapat digunakan ketika BOT menjadi admin !'
  }[type]
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
