let handler = async(m, { conn }) => {
    conn.sendFile(m.chat, `${pickRandom(global.citacita)}`, 'citacita.mp3', null, m, true)
}

handler.help = ['citacita']
handler.tags = ['fun']
handler.command = /^(citacita)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

global.citacita = ['http://piyobot.000webhostapp.com/citacita1.mp3',
    'http://piyobot.000webhostapp.com/citacita2.mp3',
    'http://piyobot.000webhostapp.com/citacita3.mp3',
    'http://piyobot.000webhostapp.com/citacita4.mp3',
    'http://piyobot.000webhostapp.com/citacita5.mp3',
    'http://piyobot.000webhostapp.com/citacita6.mp3',
    'http://piyobot.000webhostapp.com/citacita7.mp3',
    'http://piyobot.000webhostapp.com/citacita8.mp3',
    'http://piyobot.000webhostapp.com/citacita9.mp3',
    'http://piyobot.000webhostapp.com/citacita10.mp3',
    'http://piyobot.000webhostapp.com/citacita11.mp3',
    'http://piyobot.000webhostapp.com/citacita12.mp3',
    'http://piyobot.000webhostapp.com/citacita13.mp3',
    'http://piyobot.000webhostapp.com/citacita14.mp3',
    'http://piyobot.000webhostapp.com/citacita15.mp3',
    'http://piyobot.000webhostapp.com/citacita16.mp3',
    'http://piyobot.000webhostapp.com/citacita17.mp3',
    'http://piyobot.000webhostapp.com/citacita18.mp3',
    'http://piyobot.000webhostapp.com/citacita19.mp3',
    'http://piyobot.000webhostapp.com/citacita20.mp3',
    'http://piyobot.000webhostapp.com/citacita21.mp3',
    'http://piyobot.000webhostapp.com/citacita22.mp3',
    'http://piyobot.000webhostapp.com/citacita23.mp3',
    'http://piyobot.000webhostapp.com/citacita24.mp3',
    'http://piyobot.000webhostapp.com/citacita25.mp3',
    'http://piyobot.000webhostapp.com/citacita26.mp3',
    'http://piyobot.000webhostapp.com/citacita27.mp3',
    'http://piyobot.000webhostapp.com/citacita28.mp3',
    'http://piyobot.000webhostapp.com/citacita29.mp3',
    'http://piyobot.000webhostapp.com/citacita30.mp3',
    'http://piyobot.000webhostapp.com/citacita31.mp3',
    'http://piyobot.000webhostapp.com/citacita32.mp3',
    'http://piyobot.000webhostapp.com/citacita33.mp3',
    'http://piyobot.000webhostapp.com/citacita34.mp3',
    'http://piyobot.000webhostapp.com/citacita35.mp3',
]