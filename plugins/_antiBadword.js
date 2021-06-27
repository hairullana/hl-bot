let handler = m => m
handler.before = async (m, { conn, isBotAdmin, isAdmin, whitelist, antiBadword, isOwner }) => {
	if (antiBadword && m.isGroup && !isAdmin && isBotAdmin && !whitelist && !isOwner) {
    if (m.text.match(/(bitch|keparat|fuck|bastard|anjing|babi|pantek|bajingan|coli|colmek|pukimak|lonte|dongo|biadab|biadap|ngocok|toket|tempek|tomlol|henceut|kanjut|oppai|tetek|kanyut|itil|titit|tytyd|tolol|idiot|bangsat|bangsad|pucek|kontol|pantek|memek|puki|jembut|meki|jingan|bodoh|goblok|bokep|dajjal|silit|setan|sange|jancok|dancok|goblog|autis|bagong|peler|ngentot|ngentod|ngewe|pler|ngtd|kntl|ajg|njing|njeng|kafir|xnxx|xvideos|crot)/gi)) {
      global.DATABASE.data.users[m.sender].warning += 1
      var warning = global.DATABASE.data.users[m.sender].warning
      if (warning > 4) {
        conn.reply(m.chat, `*❏ WARNING*\n\n@${m.sender.split('@')[0]} sudah mendapatkan 5 peringatan dan akan segera dikick !`, m, {
          contextInfo: {
            mentionedJid: [m.sender]
          }
        }).then(() => {
          conn.groupRemove(m.chat, [m.sender])
          global.DATABASE.data.users[m.sender].warning = 0
        })
      } else {
        conn.reply(m.chat, `*❏ WARNING*\n\n@${m.sender.split('@')[0]} : [ ${warning} / 5 ]\n\nJangan berkata kasar !\n5 warning = kick !\n\nKetik *.delwarn* untuk menghapus warning`, m, {
          contextInfo: {
            mentionedJid: [m.sender]
          }
        })
      }
    }
  }
}
module.exports = handler