let {
  WAConnection: _WAConnection,
  WA_MESSAGE_STUB_TYPES,
  Presence,
  MessageType,
  MessageOptions,
  Mimetype,
  GroupSettingChange
} = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
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

global.hl = "."
global.packname = 'HL BOT'
global.author = 'LTM BOT'
global.wait = '_Sedang diproses . . ._'
global.error = '_Fitur Error !_'

global.owner = ['6283119526456','6282215215399']
global.mods = ['6281524633549', '6281257735703', '6281351236907']
global.modsName = ['galang', 'loli', 'ara']
global.prems = []
global.APIs = {
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
  apiflash: 'https://api.apiflash.com',
  public_restapi: 'http://public-restapi.herokuapp.com',
  lindow: 'https://lindow-api.herokuapp.com'
}
global.APIKeys = {
  'https://api.xteam.xyz': 'hairullana',
  'https://pencarikode.xyz': 'APIKEY'
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

global.prefix = new RegExp('^[' + (opts['prefix'] || hl) + ']')

// set db awal
global.DATABASE = new(require('./lib/database'))(opts._[0] ? opts._[0] + '_' : '' + 'database.json', null, 2)
if (!global.DATABASE.data.users) global.DATABASE.data = {
  users: {},
  groups: {},
  chats: {},
  maintenance: false,
  cleanDB: 0,
  backupDB: 0
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
conn.version = [2, 2119, 6]
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
        if (!isNumber(user.usebot)) user.usebot = 0
        if (!isNumber(user.xp)) user.xp = 0
      } else global.DATABASE._data.users[m.sender] = {
        xp: 0,
        usebot: 0,
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
        antiLink: false,
        antiVirtex: false,
        antiBadword: false,
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
    let maintenance = global.DATABASE.data.maintenance
    let adminMode = global.DATABASE.data.chats[m.chat].adminMode
    let whitelist = global.DATABASE._data.users[m.sender].whitelist
    let isPrems = global.DATABASE._data.users[m.sender].premium
    let isBanned = global.DATABASE.data.users[m.sender].isBanned
    let antiLink = global.DATABASE.data.chats[m.chat].antiLink
    let antiVirtex = global.DATABASE.data.chats[m.chat].antiVirtex
    let antiSpam = global.DATABASE.data.chats[m.chat].antiSpam
    let antiBadword = global.DATABASE.data.chats[m.chat].antiBadword

    await conn.chatRead(m.chat)
    conn.withoutContact = true

    if (isBanned) return

    // partisipasi
    global.DATABASE.data.chats[m.chat].lastseen = new Date() * 1
    if (!isBanned) {
      global.DATABASE.data.users[m.sender].exp += 1000
      global.DATABASE.data.users[m.sender].lastseen = new Date() * 1
      if (m.text.slice(0, 1) == hl) {
        global.DATABASE.data.users[m.sender].usebot = new Date() * 1
      }
    }

    if (maintenance && !isOwner && m.text.slice(0, 1) == hl) return
    if (adminMode && !isOwner && m.isGroup && !isAdmin && m.text.slice(0, 1) == hl) return

    // ANTI-SPAM COMMAND
    if (m.text.slice(0, 1) == hl) {
      global.DATABASE.data.chats[m.chat].command += 1
    }
    let cmd = global.DATABASE.data.chats[m.chat].command
    if (cmd >= 1) setTimeout(() => {
      global.DATABASE.data.chats[m.chat].command = 0
    }, 5500)
    if (cmd <= 1) {
      if (!isOwner && opts['self']) return
    } else {
      if (!isOwner && !opts['self']) return
    }

    let usedPrefix
    for (let name in global.plugins) {
      let plugin = global.plugins[name]
      if (!plugin) continue
      if (plugin.disabled) continue
      if (!opts['restrict'])
        if (plugin.tags && plugin.tags.includes('admin')) continue
      const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
      let match = (_prefix instanceof RegExp ? // RegExp Mode?
        [
          [_prefix.exec(m.text), _prefix]
        ] :
        Array.isArray(_prefix) ? // Array?
        _prefix.map(p => {
          let re = p instanceof RegExp ? // RegExp in Array?
            p :
            new RegExp(str2Regex(p))
          return [re.exec(m.text), re]
        }) :
        typeof _prefix === 'string' ? // String?
        [
          [new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]
        ] : [
          [
            [], new RegExp
          ]
        ]
      ).find(p => p[1])
      if (typeof plugin.before == 'function')
        if (await plugin.before.call(this, m, {
            match,
            conn: this,
            participants,
            groupMetadata,
            user,
            bot,
            isROwner,
            isOwner,
            isMods,
            isAdmin,
            isBotAdmin,
            isPrems,
            isBanned,
            antiLink,
            antiVirtex,
            antiSpam,
            antiBadword
          })) continue
      if ((usedPrefix = (match[0] || '')[0])) {
        let noPrefix = m.text.replace(usedPrefix, '')
        let [command, ...args] = noPrefix.trim().split ` `.filter(v => v)
        args = args || []
        let _args = noPrefix.trim().split ` `.slice(1)
        let text = _args.join ` `
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
        if (global.DATABASE.data.users[m.sender].limit < 1 && plugin.limit) {
          this.reply(m.chat, `*❏ LIMIT HABIS*\n\nCara mendapatkan limit :\n\n1. Beli limit ( *.buy _total_* )\n2. Daily claim ( *.claim* )\n3. Mengemis limit/saldo kepada user sultan ( *.rank* )`, m)
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
            isPrems,
            whitelist,
            maintenance
          })
          m.limit = m.limit || plugin.limit || false
        } catch (e) {
          // Error occured
          m.error = e
          console.log(e)
          if (e) {
            let text = util.format(e)
            for (let key of Object.values(global.APIKeys))
              text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
            m.reply(text)
          }
        } finally {
          // limit terpakai
        }
        break
      }
    }
  } finally {
    let user
    if (m && m.sender && (user = global.DATABASE.data.users[m.sender])) {
      var limitAsli
      if (global.DATABASE.data.users[m.sender].limit > 10000000000050) {
        limitAsli = 10000000000000
      } else if (global.DATABASE.data.users[m.sender].limit > 1000000000050) {
        limitAsli = 1000000000000
      } else if (global.DATABASE.data.users[m.sender].limit > 100000000050) {
        limitAsli = 100000000000
      } else if (global.DATABASE.data.users[m.sender].limit > 10000000050) {
        limitAsli = 10000000000
      } else if (global.DATABASE.data.users[m.sender].limit > 1000000050) {
        limitAsli = 1000000000
      } else if (global.DATABASE.data.users[m.sender].limit > 100000050) {
        limitAsli = 100000000
      } else if (global.DATABASE.data.users[m.sender].limit > 10000050) {
        limitAsli = 10000000
      } else if (global.DATABASE.data.users[m.sender].limit > 1000050) {
        limitAsli = 1000000
      } else if (global.DATABASE.data.users[m.sender].limit > 100050) {
        limitAsli = 100000
      } else if (global.DATABASE.data.users[m.sender].limit > 10050) {
        limitAsli = 10000
      } else if (global.DATABASE.data.users[m.sender].limit > 1050) {
        limitAsli = 1000
      } else if (global.DATABASE.data.users[m.sender].limit > 150) {
        limitAsli = 100
      } else if (global.DATABASE.data.users[m.sender].limit > 50) {
        limitAsli = 10
      } else if (global.DATABASE.data.users[m.sender].limit > 20) {
        limitAsli = 5
      } else if (global.DATABASE.data.users[m.sender].limit > 1) {
        limitAsli = 2
      } else(
        limitAsli = 1
      )

      levelAwal = conn.level(user.xp)[0]
      if (user.premium == true) {
        user.limit -= m.limit * 1
        user.xp += m.limit * 1
      } else if (user.limit > 100 || user.exp > 500000000) {
        user.limit -= m.limit * limitAsli
      } else {
        user.limit -= m.limit * 1
      }
      // nambah level
      user.xp += m.limit * 1

      levelAkhir = conn.level(user.xp)[0]
      if (levelAwal != levelAkhir) {
        conn.reply(m.chat, `*❏ LEVEL UP*\n\n@${m.sender.split('@')[0]}\n*[ ${levelAwal} ] 👉 [ ${levelAkhir} ]*`, m, {
          contextInfo: {
            mentionedJid: [m.sender]
          }
        })
      }
    }
    try {
      require('./lib/print')(m, this)
    } catch (e) {
      console.log(m, m.quoted, e)
    }
  }
}

conn.welcome = 'Hai, *@user* !\nSelamat datang di *@group*'
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
      let text = (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@user', '@' + user.split('@')[0]).replace('@group', this.getGroup(m.key.remoteJid))
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
      let text = (chat.sBye || this.bye || conn.bye || 'Selamat tinggal, @user!').replace('@user', '@' + user.split('@')[0]).replace('@group', this.getGroup(m.key.remoteJid))
      this.sendFile(m.key.remoteJid, pp, 'pp.jpg', text, m, false, {
        contextInfo: {
          mentionedJid: [user]
        }
      })
    }
  }
}

conn.on('message-new', conn.handler)
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
    rowner: '*❏ AKSES DITOLAK*\n\nFitur ini khusus untuk owner.',
    owner: '*❏ AKSES DITOLAK*\n\nFitur ini khusus untuk owner.',
    mods: '*❏ AKSES DITOLAK*\n\nFitur ini khusus untuk owner.',
    premium: '*❏ AKSES DITOLAK*\n\nFitur ini khusus untuk user premium.\nHubungi owner ( *.owner* ) untuk upgrade premium',
    group: '*❏ AKSES DITOLAK*\n\nFitur ini khusus untuk di dalam grup.',
    private: '*❏ AKSES DITOLAK*\n\nFitur ini khusus untuk di chat pribadi bot.',
    admin: '*❏ AKSES DITOLAK*\n\nFitur ini khusus untuk admin.',
    botAdmin: '*❏ AKSES DITOLAK*\n\nJadikan bot sebagai admin terlebih dahulu.'
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