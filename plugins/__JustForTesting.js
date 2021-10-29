let handler = m => m
handler.before = async (m, { conn, text }) => {
	if (text == 'hl') {
    return 'hai'
  }
}
module.exports = handler