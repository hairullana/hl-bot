let handler = async (m, { conn, usedPrefix, text, command }) => {
  conn.war = conn.war ? conn.war : {}
  conn.war2 = conn.war2 ? conn.war2 : {}

  if (!text) return m.reply(`*Selamat Datang di War Zone*

*${usedPrefix + command} join* = join game
*${usedPrefix + command} left* = left game
*${usedPrefix + command} player* = player game
*${usedPrefix + command} start* = start game`)


  // JOIN
  if (text == "join"){
    // FIRST PLAYER
    if (!(m.chat in conn.war)) {
      conn.war2[m.chat] = {"war" : false, "turn" : 0}
      conn.war[m.chat] = []
      conn.war[m.chat][0] = {"user" : m.sender, "blood" : 5000}
      for (i=1;i<10;i++){
        conn.war[m.chat][i] = {"user" : "", "blood" : 0}
      }
    }else {   // NOT FIRST PLAYER
      // IF FULL
      if (conn.war2[m.chat].war) {
        return m.reply(`*Permainan sudah dimulai, tidak bisa join.*`)
      }
      // IF YOU ALREADY JOIN THE GAME
      for (i = 0 ; i < conn.war[m.chat].length ; i++) {
        if (m.sender == conn.war[m.chat][i].user){
          return m.reply(`*Anda sudah masuk ke dalam game*\n\n*Butuh 10 pemain untuk memulai game*`)
        }
      }
      
      // m.reply("asu")
      for (i = 1 ; i < 10 ; i++) {
        if (conn.war[m.chat][i] == ""){
          conn.war[m.chat][i] = {"user" : m.sender, "blood" : 5000}
          if (i % 2 == 1){
            return m.reply(`*Berhasil masuk ke dalam game sebagai Team A*\n\n*Butuh 10 pemain untuk memulai game*`)
          }else {
            return m.reply(`*Berhasil masuk ke dalam game sebagai Team B*\n\n*Butuh 10 pemain untuk memulai game*`)
          }
        }
      }

      // CHECK IF ROOM FULL
      if (conn.war[m.chat].length == 10) {
        conn.war2[m.chat].war = true
      }
    }
  }

  // LEFT GAME
  if (text == "left"){
    // IF GAME START
    if (conn.war2[m.chat].war) {
      m.reply(`*Perang sudah dimulai, anda tidak bisa keluar*`)
    }else {   // IF NOT
      for (i = 0 ; i < conn.war[m.chat].length ; i++) {
        if (m.sender == conn.war[m.chat][i].user){
          delete conn.war[m.chat][i]
          return m.reply(`*Berhasil keluar dari game*\n\n*Butuh ${10 - conn.war[m.chat].length} user lagi*`)
        }
      }
    }
  }

  // CEK PLAYER
  if (text == "player"){ 
    if (!(m.chat in conn.war)) return m.reply(`*Tidak ada pemain yang join room War Zone*`)
    var teamA = []
    var teamB = []
    var teamAB = []
    for (i = 0 ; i < conn.war[m.chat].length ; i++){
      if (i % 2 == 0){
        teamA.push(conn.war[m.chat][i].user)
      }else {
        teamB.push(conn.war[m.chat][i].user)
      }
      teamAB.push(conn.war[m.chat][i].user)
    }
    // return m.reply(teamA[0])
    conn.reply(m.chat, '*❏ LIST PLAYER*\n\nTeam A :\n' + teamA.map(v => '- @' + v.split('@')[0]).join`\n` + "\n\nTeam B :\n" + teamB.map(v => '- @' + v.split('@')[0]).join`\n`,m, {contextInfo: {
      mentionedJid: teamAB
    }})
  }
}
handler.help = ['war']
handler.tags = ['game']
handler.command = /^(war)$/i
handler.group = true
module.exports = handler