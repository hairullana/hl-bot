let handler  = async (m, { conn, args }) => {
  function msToDate(ms) {
    temp = ms
    days = Math.floor(ms / (24*60*60*1000));
    daysms = ms % (24*60*60*1000);
    hours = Math.floor((daysms)/(60*60*1000));
    hoursms = ms % (60*60*1000);
    minutes = Math.floor((hoursms)/(60*1000));
    minutesms = ms % (60*1000);
    sec = Math.floor((minutesms)/(1000));
    return days+"H "+hours+"J "+ minutes + "M";
    // +minutes+":"+sec;
  }
  
  if (args[0] == "left"){
    conn.groupLeave(args[1])
    await conn.modifyChat(args[1], 'delete').catch(console.log)
    delete global.DATABASE.data.chats[args[0]]
    m.reply(`*❏ Berhasil mengeluarkan bot dari grup ${conn.getName(args[1])} dan menghapus data dari DB.*`)
  }else if (args[0] == "delete" || args[0] == "del"){
    delete global.DATABASE.data.chats[args[0]]
    await conn.modifyChat(args[1], 'delete').catch(console.log)
    m.reply(`*Berhasil menghapus chat grup ${conn.getName(args[1])} dan menghapus data dari DB.*`)
  }else if(args[0] == "link"){
    conn.reply(m.chat, `*${conn.getName(args[1])}*\n\nhttps://chat.whatsapp.com/` + (await conn.groupInviteCode(args[1])), m)
  }else if(args[0] == "clear"){
    await conn.modifyChat(args[1], 'delete').catch(console.log)
  }else if(args[0] == "expired"){
    var jumlahHari = 86400000 * args[1]
    var now = new Date() * 1
    if (now < global.DATABASE.data.chats[args[2]].expired) global.DATABASE.data.chats[args[2]].expired += jumlahHari
    else global.DATABASE.data.chats[args[2]].expired = now + jumlahHari
    conn.reply(m.chat,`*❏ EXPIRED GROUP*\n\nBerhasil menambah _expired day_ untuk *${conn.getName(args[2])}* selama *${args[1]
    } hari*.\n\nTotal Expired : ${msToDate(global.DATABASE.data.chats[args[2]].expired - now)}`)
    conn.reply(args[2],`*❏ EXPIRED GROUP*\n\nBerhasil menambah _expired day_ untuk *${conn.getName(args[2])}* selama *${args[1]} hari*.\n\nTotal Expired : ${msToDate(global.DATABASE.data.chats[args[2]].expired - now)}`)
  }else{
    m.reply(`*❏ Hanya tersedia fitur :*\n\n- left\n- del/delete\n- clear\n- link\n- expired`)
  }
}
handler.help = ['gc *option*']
handler.tags = ['owner']
handler.command = /^(gc)$/i
handler.owner = true
module.exports = handler