let handler = async (m, { conn }) => {
  conn.reply(m.chat,`*DONASI HL GANS BOT*\n\nDANA / OVO / GOPAY : 083119526456\n\n(*) Donasi berapapun akan membuat anda menjadi *premium user*, limit tak terbatas\n(*) Semua hasil donasi akan digunakan untuk kelangsungan bot.\nKarena bot juga butuh biaya server, listrik dan internet\nMwah aku tayang kamoeh :*`) // Tambah sendiri kalo mau
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^donasi|anu$/i

module.exports = handler
