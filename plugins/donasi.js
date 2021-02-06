let handler = async m => m.reply(`
╭─「 Donasi Pulsa / DANA」
│ • Axis [ 083119526456 ]
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
