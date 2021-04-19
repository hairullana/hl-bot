let handler = async (m, { conn }) => {
  conn.reply(m.chat,`*DONASI HL GANS BOT*\n\n083119526456 DANA/OVO\n082215215399 PULSA\n\n(*) Donasi akan membuat anda menjadi premium user (.infopremium)\n(*) Semua hasil donasi akan digunakan untuk kelangsungan bot.\nKarena bot juga butuh biaya server, listrik dan internet\nMwah aku tayang kamoeh :*`) // Tambah sendiri kalo mau
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^donasi|anu$/i

module.exports = handler
