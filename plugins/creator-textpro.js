let handler = async (m, { conn, text, command }) => {
  if (!text) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM BOT*`
  if (text.length > 15) throw `*Masukkan maksimal 15 karakter*`

  m.reply(global.wait)
  let img
  let text1
  let text2

  switch (command) {
    case '3dglue' :
      img = global.API('xteam', '/textpro/3dglue', {
        text: text
      }, 'APIKEY')
      break
    case '3dmetalsilver' :
      text1 = text.split('|')[0]
      text2 = text.split('|')[1]
      if (!text2) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM|Bot*`
      if (text1.length > 15 || text2.length > 15) throw `*Masukkan maksimal 15 karakter*`
      img = global.API('xteam', '/textpro/3dmetalsilver', {
        text: text1,
        text2: text2
      }, 'APIKEY')
      break
    case 'tahta' :
      img = global.API('xteam', '/tahta', {
        text: text
      }, 'APIKEY')
      break
    case 'stone' :
      text1 = text.split('|')[0]
      text2 = text.split('|')[1]
      if (!text2) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM|Bot*`
      if (text1.length > 15 || text2.length > 15) throw `*Masukkan maksimal 15 karakter*`
      img = global.API('xteam', '/textpro/stone', {
        text: text1,
        text2: text2
      }, 'APIKEY')
      break
    case 'steel' :
      img = global.API('xteam', '/textpro/steel', {
        text: text
      }, 'APIKEY')
      break
    case 'snow' :
      img = global.API('xteam', '/textpro/snowtext', {
        text: text
      }, 'APIKEY')
      break
    case 'sandwriting' :
      img = global.API('xteam', '/textpro/sandwriting', {
        text: text
      }, 'APIKEY')
      break
    case 'sand' :
      img = global.API('xteam', '/textpro/sand', {
        text: text
      }, 'APIKEY')
      break
    case 'quotemaker' :
      text1 = text.split('|')[0]
      text2 = text.split('|')[1]
      if (!text2) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM|Bot*`
      if (text1.length > 15 || text2.length > 15) throw `*Masukkan maksimal 15 karakter*`
      img = global.API('xteam', '/quotemaker', {
        text: text1,
        wm: text2
      }, 'APIKEY')
      break
    case 'pornhub' :
      text1 = text.split('|')[0]
      text2 = text.split('|')[1]
      if (!text2) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM|Bot*`
      if (text1.length > 15 || text2.length > 15) throw `*Masukkan maksimal 15 karakter*`
      img = global.API('xteam', '/textpro/ph', {
        text: text1,
        text2: text2
      }, 'APIKEY')
      break
    case 'neongalaxy' :
      img = global.API('xteam', '/textpro/neongalaxy', {
        text: text
      }, 'APIKEY')
      break
    case 'neon' :
      img = global.API('xteam', '/textpro/neon', {
        text: text
      }, 'APIKEY')
      break
    case 'minion3d' :
      img = global.API('xteam', '/textpro/minion3d', {
        text: text
      }, 'APIKEY')
      break
    case 'marvel2' :
      text1 = text.split('|')[0]
      text2 = text.split('|')[1]
      if (!text2) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM|Bot*`
      if (text1.length > 15 || text2.length > 15) throw `*Masukkan maksimal 15 karakter*`
      img = global.API('xteam', '/textpro/marvel', {
        text: text1,
        text2: text2
      }, 'APIKEY')
      break
    case 'marvel' :
      img = global.API('xteam', '/textpro/marvelstudios', {
        text: text1,
        text2: text2
      }, 'APIKEY')
      break
    case 'helloween' :
      img = global.API('xteam', '/textpro/helloweenfire', {
        text: text
      }, 'APIKEY')
      break
    case 'glitch' :
      text1 = text.split('|')[0]
      text2 = text.split('|')[1]
      if (!text2) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM|Bot*`
      if (text1.length > 15 || text2.length > 15) throw `*Masukkan maksimal 15 karakter*`
      img = global.API('xteam', '/textpro/glitch', {
        text: text1,
        text2: text2
      }, 'APIKEY')
      break
    case 'cloudsky' :
      img = global.API('xteam', '/textpro/cloudsky', {
        text: text
      }, 'APIKEY')
      break
    case 'cloud' :
      img = global.API('xteam', '/textpro/cloudtext', {
        text: text
      }, 'APIKEY')
      break
    case 'blood' :
      img = global.API('xteam', '/textpro/bloodontheroastedglass', {
        text: text
      }, 'APIKEY')
      break
    case 'blackpink' :
      img = global.API('xteam', '/textpro/blackpink', {
        text: text
      }, 'APIKEY')
      break
    case 'avenger' :
      text1 = text.split('|')[0]
      text2 = text.split('|')[1]
      if (!text2) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM|Bot*`
      if (text1.length > 15 || text2.length > 15) throw `*Masukkan maksimal 15 karakter*`
      img = global.API('xteam', '/textpro/3davenger', {
        text: text1,
        text2: text2
      }, 'APIKEY')
      break
    case 'joker' :
      img = global.API('xteam', '/textpro/jokerlogo', {
        text: text
      }, 'APIKEY')
      break
    case 'lion' :
      text1 = text.split('|')[0]
      text2 = text.split('|')[1]
      if (!text2) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM|Bot*`
      if (text1.length > 15 || text2.length > 15) throw `*Masukkan maksimal 15 karakter*`
      img = global.API('xteam', '/textpro/lionlogomascot', {
        text: text1,
        text2: text2
      }, 'APIKEY')
      break
    case 'ninja' :
      text1 = text.split('|')[0]
      text2 = text.split('|')[1]
      if (!text2) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM|Bot*`
      if (text1.length > 15 || text2.length > 15) throw `*Masukkan maksimal 15 karakter*`
      img = global.API('xteam', '/textpro/ninjalogo', {
        text: text1,
        text2: text2
      }, 'APIKEY')
      break
    case 'wolf' :
      text1 = text.split('|')[0]
      text2 = text.split('|')[1]
      if (!text2) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM|Bot*`
      if (text1.length > 15 || text2.length > 15) throw `*Masukkan maksimal 15 karakter*`
      img = global.API('xteam', '/textpro/wolflogoblackwhite', {
        text: text1,
        text2: text2
      }, 'APIKEY')
      break
    case 'wolf2' :
      text1 = text.split('|')[0]
      text2 = text.split('|')[1]
      if (!text2) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} LTM|Bot*`
      if (text1.length > 15 || text2.length > 15) throw `*Masukkan maksimal 15 karakter*`
      img = global.API('xteam', '/textpro/wolflogogalaxy', {
        text: text1,
        text2: text2
      }, 'APIKEY')
      break
  }
  
  try{
    conn.sendFile(m.chat, img, 'img.jpg', null, m)
  } catch (e) {
    m.reply(e)
  }
}
handler.help = ['3dglue','3dmetalsilver','tahta','stone','steel','snow','sandwriting','sand','quotemaker','pornhub','neongalaxy','neon','minion3d','marvel2','marvel','helloween','glitch','cloudsky','cloud','blood','blackpink','avenger','joker','lion','ninja','wolf','wolf2']
handler.tags = ['creator']
handler.command = /^(3dglue|3dmetalsilver|tahta|stone|steel|snow|sandwriting|sand|quotemaker|pornhub|neongalaxy|neon|minion3d|marvel2|marvel|helloween|glitch|cloudsky|cloud|blood|blackpink|avenger|joker|lion|ninja|wolf|wolf2)$/i
handler.limit = true
handler.exp = 5000
module.exports = handler