const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const FormData = require('form-data')
const { createExif, modStick } = require("../lib/exif")

let handler = async (m, { conn, args, isPrems }) => {
    let stiker = false
    try {
        let q = m.quoted ? { message: { [m.quoted.mtype]: m.quoted } } : m
        if (/image|video/.test((m.quoted ? m.quoted : m.msg).mimetype || '')) {
            let img = await conn.downloadM(q)
            if (!img) throw img
            stiker = await toSticker(img)
        }
    } catch (e) {
        throw '*Ups sepertinya ada yang salah!*'
    } finally {
        if (stiker) {
            anu = args.join(' ').split('|')
            if (isPrems) {
                satu = anu[0] !== '' ? anu[0] : global.packname
                dua = typeof anu[1] !== 'undefined' ? anu[1] : global.author
                createExif(satu, dua)
                modStick(stiker, conn, m, m.chat)
            } else {
                satu = global.packname
                dua = global.author
                createExif(satu, dua)
                modStick(stiker, conn, m, m.chat)
            }
        }
    }
}
handler.help = ['sk2 (caption|reply media)']
handler.tags = ['sticker']
handler.command = /^(sk2)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler

async function canvas(code, type = 'png', quality = 0.92) {
    let res = await fetch('https://nurutomo.herokuapp.com/api/canvas?' + queryURL({
        type,
        quality
    }), {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': code.length
        },
        body: code
    })
    let image = await res.buffer()
    return image
}

function queryURL(queries) {
    return Object.entries(queries).map(([key, value]) => key + (value ? '=' + encodeURIComponent(value) : '')).join('&')
}

let { fromBuffer } = require('file-type')
async function sticker(img, url) {
    url = url ? url : await uploadImage(img)
    let {
        mime
    } = url ? { mime: 'image/jpeg' } : await fromBuffer(img)
    let sc = `let im = await loadImg('data:${mime};base64,'+(await window.loadToDataURI('${url}')))
c.width = c.height = 512
let max = Math.max(im.width, im.height)
let w = 512 * im.width / max
let h = 512 * im.height / max
ctx.drawImage(im, 256 - w / 2, 256 - h / 2, w, h)
`
    return await canvas(sc, 'webp')
}

function uploadImage(buffer) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                ext
            } = await fromBuffer(buffer)
            let form = new FormData()
            form.append('file', buffer, 'tmp.' + ext)
            let res = await fetch('https://telegra.ph/upload', {
                method: 'POST',
                body: form
            })
            let img = await res.json()
            if (img.error) reject(img.error)
            else resolve('https://telegra.ph' + img[0].src)
        } catch (e) {
            reject(e)
        }
    })
}

function toSticker(buffer, ext) {
    let tmp = path.join(__dirname, '../tmp' + (new Date * 1) + '.' + ext)
    let out = tmp.replace(new RegExp(ext + '$'), 'webp')
    return new Promise((resolve, reject) => {
        fs.writeFileSync(tmp, buffer)
        spawn('ffmpeg', [
            '-y',
            '-i', tmp,
            `-vcodec`, `libwebp`,
            `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            '-f', 'webp',
            out])
            .on('error', reject)
            .on('error', () => fs.unlinkSync(tmp))
            .on('exit', () => {
                resolve(out)
                fs.unlinkSync(tmp)
            })
    })

}