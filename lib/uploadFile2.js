const fetch = require('node-fetch')
const FormData = require('form-data')
const { fromBuffer } = require('file-type')

let url = 'https://api.indocoder.dev/'
module.exports = async buffer => {
	const { ext } = await fromBuffer(buffer) || {}
	let form = new FormData
	form.append('berkas', buffer, 'file.' + ext)
	let res = await fetch(url, {
    	method: 'POST',
    	body: form
	})
	let json = await res.json()
	if (!json.status) throw json
	return json.result.link
}