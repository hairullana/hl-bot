// let handler = m => m
// handler.before = async (m, { conn }) => {
//   // clean db 6 jam sekali
// 	if(new Date() * 1 - global.DATABASE.data.cleanDB > 1000 * 60 * 60 * 6){
// 		let users = global.DATABASE.data.users
//   	let chats = global.DATABASE.data.chats
// 		let anu = 86400000 * 10
//   	let now = new Date() * 1
// 		var user = 0
//     for (let jid in users){
//       if (now - users[jid].lastseen > anu){
//         if (users[jid].premium){
//           if(now >= global.DATABASE.data.users[m.sender].premiumDate){
//             delete users[jid]
//             user += 1
//           }
//         }else {
//           delete users[jid]
//           user += 1
//         }
//       }
//     }
//     var chat = 0
//     for (let jid in chats){
//       if  (now - chats[jid].lastseen > anu){
//         delete chats[jid]
//         chat += 1
//       }
//     }
// 		if (user > 0 || chat > 0) conn.reply(owner[0] + '@s.whatsapp.net',`*❏ DB Cleaner*\n\n[ - ] ${user} users\n[ - ] ${chat} chats`)
// 		global.DATABASE.data.cleanDB = new Date() * 1
// 	}
// }
// module.exports = handler