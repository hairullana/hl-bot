const scrapy = require('node-scrapy')
const url = 'https://kbbi.kemdikbud.go.id/entri/'
const kata = process.argv.slice(2).join(' ')
const model = {
  lema: 'h2',
  arti: ['ol li', 'ul.adjusted-par']
}
scrapy.scrape(url + encodeURIComponent(kata), model, (err, data) => {
  if (err) return console.log(err)
  console.log(data)
})