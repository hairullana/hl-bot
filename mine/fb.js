const cheerio = require('cheerio')
const fetch = require('node-fetch')

module.exports = function fb(url) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams()
		params.append('URLz', url)
		fetch('https://fdown.net/download.php', { method: 'POST', body: params })
		.then(res => res.text())
		.then(res => {
			const $ = cheerio.load(res);
    		x = $('body').find('a[id="hdlink"]').attr('href')
			y = $('body').find('a[id="sdlink"]').attr('href')
	 	   data = { hd: x, sd: y }
			if(typeof data.hd == 'undefined') return resolve({ creator: '@neoxrs – Wildan Izzudin', status: false })
			resolve({ creator: '@neoxrs – Wildan Izzudin', status: true, data })
		}).catch(reject)
	})
}