let handler = async (m, { conn, text, participants, usedPrefix, command, isPrems }) => {
    if (!m.isGroup) throw 'Perintah ini hanya bisa digunakan digrup!'
    let user = global.DATABASE.data.users[m.sender]
    if (user.limit < 1) {
        throw `Limit kamu habis, cara mendapatkan Limit:
  
• Membeli ${usedPrefix}premium
• Menjawab ${usedPrefix}math - jika benar kamu mendapat 1 Limit`
    } else {
        if (!isPrems) user.limit -= 1
    }
    let member = participants.map(u => u.jid)
    let siapa = member[Math.floor(Math.random() * member.length)]
    let jawab = `
Pertanyaan : ${command + ' ' + text}?
Jawaban : @${siapa.replace(/@.+/, '')}
    `.trim()
    let saha = [siapa]
    let mentionedJid = saha.concat(m.mentionedJid)
    conn.reply(m.chat, jawab, m, { contextInfo: { mentionedJid } })
}
handler.help = [''].map(v => 'siapa' + v + ' _text_')
handler.tags = ['fun']
handler.command = /^siapa(kah)?$/i
module.exports = handler