let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`${pickRandom(global.quotes)}`, m)
}
handler.help = ['quotes']
handler.tags = ['text']
handler.command = /^(quotes|quote)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.exp = 500

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.quotes = [
  "Orang-orang yang sukses telah belajar membuat diri mereka melakukan hal yang harus dikerjakan ketika hal itu memang harus dikerjakan, enteah mereka menyukainya atau tidak\n\n~ Aldus Huxley",
  "Orang-orang hebat di bidang apapun bukan baru bekerja karena mereka terinspirasi, namun mereka menjadi terinspirasi karena mereka lebih suka bekerja. Mereka tidak menyia-nyiakan waktu untuk menunggu inspirasi\n\n~ Ernest Newman",
  "Pahlawan bukanlah orang yang berani menetakkan pedangnya ke pundak lawan, tetapi pahlawan sebenarnya ialah orang yang sanggup menguasai dirinya dikala ia marah\n\n~ Nabi Muhammad SAW",
  "Urusan kita dalam kehidupan ini bukanlah untuk mendahului orang lain. Tetapi untuk melampaui diri kita sendiri, untuk memecahkan rekor kita sendiri, dan untuk melampaui hari kemarin dengan hari ini\n\n~ Stuart B. Johnson",
  "Semua yang dimulai dengan rasa marah, akan berakhir dengan rasa malu\n\n~ Benjamin Franklin",
  "Seorang laki laki memasuki bar, dia merayu wanita. Dia bicara gombal. Namun si wanita tidak berpendirian untuk pulang bersama. Si laki laki berkata, “bagaimana bila kau kuberi $1 juta untuk tidur denganku ?”. Si wanita tidak pernah punya uang 1 juta dolar seumur hidupnya. Dia berhenti dan mempertimbangkan tawaran tersebut. Tapi si laki laki berubah pikiran dan berkata “Bagaimana bila kurubah tawaranku menjadi hanya 1 dolar”. Si perempuan kaget dan berkata “Memang kau pikir wanita macam apa aku ?”. Si laki laki berkata “Kita sudah sama sama tau kan”. Saat ini yang kita lakukan adalah negoisasi.\n\n~ Unknow People in Mr. Robot",
  "Pengendali pikiran ya. Dia bukan penyelamat, dia hanya membuat orang lain tergantung kepadanya\n\n~ Mob Psyco",
  "Kau adalah tokoh utama dalam kehidupanmu sendiri\n\n~ Mob Psyco",
  "Kekerasan menjadi jalan bagi sebagian orang karena mereka tidak dapat berkomunikasi\n\n~ Mr. Robot",
  "Manusia selalu jadi exploit terbaik\n\n~ Elliot Alderson",
  "Beberapa orang akhirnya pergi bukan karena tidak cinta, terkadang mereka lelah karena terus dipaksa sempurna\n\n~ Boy Candra",
  "Today started just like yesterday and the day before that and the day before that and every day for the last month, a loop, my perfectly constructed loop.\n\n~ Elliot Alderson",
  "Jika saya mencoba yang terbaik dan gagal, setidaknya saya telah melakukan yang terbaik\n\n~ Steve Jobs",
  "Kita tidak bisa menutup mulu semua orang, tapi kita bisa menutup telinga kita\n\n~ Gatau Siapa Ajg",
  "Jangan rusak jalan cerita orang lain\n\n~ Unknow",
  "Saya mau sedikit cerita tentang gimana saya mampu lewatin ini semua.\nSetiap harinya, saya selalu mencoba mengubah cara pandang saya tentang hal ini, 'ini hanya masalah waktu, ini hanya soal kebiasaan'.\nSaya selalu menanamkan kalimat itu di pikiran saya dan akhirnya saya berhasil melewati hari-hari patah itu dan menemukan ia yang setia menemani hari-hari setelahnya.\nKemudian saya percaya bahwa cinta yang baik tidak akan mengkhianati dirinya sendiri dan itu benar adanya\n\n~ Rhia Lestari",
  "Dihormati dan ditakuti itu berbeda\n\n~ Bapakmu",
  "Hari ini terasa buruk dan melelahkan, tapi tanpa kita sadari, kita berhasil melewatinya\n\n~ Mungkin HL Gans",
  "Kita lebih sibuk menyakinkan orang lain bahwa kita bahagia ketimbang benar-benar merasakan bahagia itu sendiri.\n\n~ Francois Roche"
]
