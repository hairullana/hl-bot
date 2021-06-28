let handler = m => m
handler.before = async (m, { conn, isOwner }) => {
	if (m.text == hl && isOwner) {
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
      var selfModeText = "Nonaktif"
    }

    if (global.DATABASE.data.groupMode) {
      var groupModeText = "Aktif"
    } else {
      var groupModeText = "Nonaktif"
    }

    let uptime = clockString(process.uptime() * 1000)

    let totalUser = Object.keys(global.DATABASE._data.users).length.toLocaleString()

    let users = global.DATABASE.data.users
    let anu = 86400000 * 10
    let now = new Date() * 1
    var userBangsat = 0
    var userPremium = 0
    var userWhitelist = 0

    for (let jid in users) {
      if (now - users[jid].usebot > anu && !users[jid].premium) userBangsat += 1
      if (users[jid].premium) userPremium += 1
      if (users[jid].whitelist) userWhitelist += 1
    }

    let userBot = (Object.keys(global.DATABASE._data.users).length - userBangsat).toLocaleString()

    let usersDB = global.DATABASE.data.users
    var totalBanned = 0
    for (let jid in usersDB){
      if (usersDB[jid].isBanned){
        totalBanned += 1
      }
    }

    await m.reply("_Checking . . ._")
    conn.reply(m.chat, `*❏ BOT STAT*
  
  *Speed :* ${new Date - old} ms
  *Uptime :* ${uptime}

*❏ BOT INFO*

  *Self Mode :* ${selfModeText}
  *Group Mode :* ${groupModeText}
  *Group :* ${groupTotal} grup
  *Chat :* ${chatTotal} chat

*❏ BOT USER*

  *Total User :* ${totalUser}
  *User Bot :* ${userBot}
  *Premium :* ${userPremium}
  *Whitelist :* ${userWhitelist}
  *Banned :* ${totalBanned}
  *Blocked :* ${conn.blocklist.length}`, m)
  }
}
module.exports = handler

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