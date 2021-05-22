let handler  = async (m, { conn, text }) => {
	const response = await conn.revokeInvite (text)
  console.log("new group code: " + response.code)
}
// handler.help = ['revoke','resetlink']
handler.tags = ['bot']
// handler.command = /^(revoke|resetlink)$/i
handler.owner = true
module.exports = handler