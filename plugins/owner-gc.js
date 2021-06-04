let handler  = async (m, { conn, text }) => {

  var hl = []
  hl[0] = text.split(' ')[0]
  hl[1] = text.split(' ')[1]
  hl[2] = text.split(' ')[2]

  if (hl[0] == "left"){
    conn.groupLeave(hl[1])
    await conn.modifyChat(hl[1], 'delete').catch(console.log)
    delete global.DATABASE.data
    m.reply(`_Berhasil mengeluarkan bot dari grup._`)
  }else if (hl[0] == "delete" || hl[0] == "del"){
    delete global.DATABASE.data
    await conn.modifyChat(hl[1], 'delete').catch(console.log)
    m.reply(`_Berhasil menghapus data dari db._`)
  }else if(hl[0] == "link"){
    conn.reply(m.chat, `*${conn.getName(hl[1])}*\n\nhttps://chat.whatsapp.com/` + (await conn.groupInviteCode(hl[1])), m)
  }else if(hl[0] == "clear"){
    await conn.modifyChat(hl[1], 'delete').catch(console.log)
  }else if(hl[0] == "info"){
    function msToDate(ms) {
      temp = ms
      days = Math.floor(ms / (24*60*60*1000));
      daysms = ms % (24*60*60*1000);
      hours = Math.floor((daysms)/(60*60*1000));
      hoursms = ms % (60*60*1000);
      minutes = Math.floor((hoursms)/(60*1000));
      minutesms = ms % (60*1000);
      sec = Math.floor((minutesms)/(1000));
      if (temp < 0){
        return "Forever"
      }else {
        return days+" Hari "+hours+" Jam "+ minutes + " Menit";
      }
    }
    m.reply(`Expired Grup *${conn.getName(hl[1])}*\n\n` + msToDate(global.DATABASE.data.chats[hl[1]].expired - new Date()))
  }else if(hl[0] == "expired"){
    if (hl[1] == "forever"){
      global.DATABASE.data.chats[m.chat].expired = 0
      return conn.reply(m.chat,`*❏  E X P I R E D  D A T E*\n\nBerhasil menetapkan _expired day_ untuk *${conn.getName(hl[2])}* untuk selamanya.*`)
    }
    var jumlahHari = 86400000 * hl[1]
    var now = new Date() * 1
    global.DATABASE.data.chats[hl[2]].expired = now + jumlahHari
    conn.reply(m.chat,`*❏  E X P I R E D  D A T E*\n\nBerhasil menetapkan _expired day_ untuk *${conn.getName(hl[2])}* selama *${hl[1]} hari*.`) 
  }else{
    m.reply(`*Hanya tersedia fitur :*\n\n- left\n- del/delete\n- clear\n- link\n- expired\n- info`)
  }
}
handler.help = ['gc']
handler.tags = ['owner']
handler.command = /^(gc)$/i
handler.owner = true
module.exports = handler