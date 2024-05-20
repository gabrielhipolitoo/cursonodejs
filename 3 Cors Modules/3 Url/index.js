const url = require('url')
const andress = 'https://www.google.com.br/catalog?produto=cadeira'
const parseUrl = new url.URL(andress)
    
console.log(parseUrl.host)
console.log(parseUrl.pathname)
console.log(parseUrl.search)
console.log(parseUrl.searchParams)
console.log(parseUrl.searchParams.get('produto'))
