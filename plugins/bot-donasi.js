let handler = async (m, { conn }) => {
  conn.reply(m.chat,`*DONASI BOT*\n\nPULSA : 083119526456\nDANA : 083119526456\nOVO : 083119526456\nGOPAY : 083119526456\nBNI : 0773074619 a.n Hairul Lana\n\n(*) Donasi berapapun akan membuat anda menjadi *premium user*, limit tak terbatas\n(*) Semua hasil donasi akan digunakan untuk kelangsungan bot.\nKarena bot juga butuh biaya server, listrik dan internet\nMwah`) // Tambah sendiri kalo mau
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^donasi|anu$/i

module.exports = handler
