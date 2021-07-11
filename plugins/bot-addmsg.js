let handler = async (m, { command, usedPrefix, text }) => {
    let M = m.constructor
    let which = command.replace(/add/i, '')
    if (!m.quoted) throw '*Reply chat yang akan disimpan !*'
    if (!text) throw `Gunakan *${usedPrefix}list${which}* untuk melihat list nya`
    let msgs = global.DATABASE._data.msgs
    if (text in msgs) throw `'${text}' telah terdaftar di list pesan`
    msgs[text] = M.toObject(await m.getQuotedObj())
    m.reply(`Berhasil menambahkan pesan di list pesan sebagai '${text}'
    
Akses dengan ${usedPrefix}get${which} ${text}`)
}
handler.help = ['vn', 'msg', 'video', 'audio', 'img', 'sticker'].map(v => 'add' + v + ' *text*')
handler.tags = ['bot','premium','fun']
handler.command = /^add(vn|msg|video|audio|img|sticker)$/
handler.premium = true
module.exports = handler