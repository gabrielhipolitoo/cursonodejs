const http = require('http')

const port = 3000

const serve = http.createServer((req,res) => {
res.statusCode=200
res.setHeader('Content-Type','text/html')    
res.end('<h1>ola</h1>')
})

serve.listen(port,() => {
    console.log('Servidor rodando na porta')
})