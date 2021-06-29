let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')
let handler = async (m, { conn, args, isPrems }) => {
  if (!args || !args[0]) return conn.reply(m.chat, '*Masukkan URL Youtube yang ingin di download videonya*', m)
  conn.reply(m.chat,global.wait,m)
  let { dl_link, thumb, title, filesize, filesizeF} = await ytv(args[0])
  conn.sendFile(m.chat, thumb, 'thumbnail.jpg', `
*❏ YOUTUBE MP4*

*Title:* ${title}
*Filesize:* ${filesizeF}
*Link:* ${dl_link}

${isPrems ? '*Tunggu, file akan segera dikirim karena kamu user premium*' : 'Ingin kirim file ? ketik *.infopremium*'}
`.trim(), m).then(() => {
  if (isPrems){
    if (filesize <= 20480){
      conn.sendFile(m.chat, dl_link, 'vid.mp4', null, m)
    }else {
      m.reply('*Silahkan download sendiri karena file berukuran lebih dari 20 MB.*')
    }
  }
})
}
handler.help = ['ytmp4'].map(v => v + ' *url*')
handler.tags = ['downloader']
handler.command = /^ytmp4$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 500
handler.limit = true

module.exports = handler

function post(url, formdata) {
    console.log(Object.keys(formdata).map(key => `${key}=${encodeURIComponent(formdata[key])}`).join('&'))
    return fetch(url, {
        method: 'POST',
        headers: {
            accept: "*/*",
            'accept-language': "en-US,en;q=0.9",
            'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: Object.keys(formdata).map(key => `${key}=${encodeURIComponent(formdata[key])}`).join('&')
    })
}
const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
function ytv(url) {
    return new Promise((resolve, reject) => {
        if (ytIdRegex.test(url)) {
            let ytId = ytIdRegex.exec(url)
            url = 'https://youtu.be/' + ytId[1]
            post('https://www.y2mate.com/mates/id4/analyze/ajax', {
                url,
                q_auto: 0,
                ajax: 1
            })
                .then(res => res.json())
                .then(res => {
                    console.log('Scraping...')
                    document = (new JSDOM(res.result)).window.document
                    yaha = document.querySelectorAll('td')
                    filesize = yaha[yaha.length - 23].innerHTML
                    id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
                    thumb = document.querySelector('img').src
                    title = document.querySelector('b').innerHTML

                    post('https://www.y2mate.com/mates/id4/convert', {
                        type: 'youtube',
                        _id: id[1],
                        v_id: ytId[1],
                        ajax: '1',
                        token: '',
                        ftype: 'mp4',
                        fquality: 360
                    })
                        .then(res => res.json())
                        .then(res => {
                            let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
                            resolve({
                                dl_link: /<a.+?href="(.+?)"/.exec(res.result)[1],
                                thumb,
                                title,
                                filesizeF: filesize,
                                filesize: KB
                            })
                        }).catch(reject)
                }).catch(reject)
        } else reject('URL INVALID')
    })
}

