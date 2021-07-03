let handler = async (m, { conn, text, participants, usedPrefix, command, isPrems }) => {
    let member = participants.map(u => u.jid)
    let siapa = member[Math.floor(Math.random() * member.length)]
    let jawab = `
*Pertanyaan :* ${command + ' ' + text}?
*Jawaban :* @${siapa.replace(/@.+/, '')}
    `.trim()
    let saha = [siapa]
    let mentionedJid = saha.concat(m.mentionedJid)
    conn.reply(m.chat, jawab, m, { contextInfo: { mentionedJid } })
}
handler.help = ['siapa *question*']
handler.tags = ['fun']
handler.command = /^siapa(kah)?$/i
handler.group = true
handler.limit = true
module.exports = handler