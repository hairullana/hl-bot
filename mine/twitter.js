const cheerio = require('cheerio')
const fetch = require('node-fetch')

module.exports = function twitter(url) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams()
		params.append('URL', url)
		fetch('https://twdown.net/download.php', { method: 'POST', body: params })
		.then(res => res.text())
		.then(res => {
			const $ = cheerio.load(res);
    		data = []
			$('div.container').find('tbody > tr > td').each(function (index, element) {
				x = $(this).find('a').attr('href')
				if(x !== '#') {
					if(typeof x !== 'undefined') {
						data.push({ url: x })
						}
					}
				})
			if(data.length == 0) return resolve({ creator: '@neoxrs – Wildan Izzudin', status: false })
			resolve({ creator: '@neoxrs – Wildan Izzudin', status: true, data })
		}).catch(reject)
	})
}