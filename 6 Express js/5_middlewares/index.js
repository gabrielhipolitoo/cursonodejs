const express = require('express')
const path = require('path')

const app = express()
const port = 3000


const checkauth = function(req,res,next) {
    req.authstatus = true

    if(req.authstatus){
        console.log('esta logado')
        next()
    }
    else{
        console.log('Não esta logado')
    }
}

app.use(checkauth)

const basePath = path.join(__dirname,'templates')
app.get('/',(req,res) => {
    res.sendFile(`${basePath}/index.html`)
})


app.listen(port,() => {
    console.log('Servidor rodando na porta',port)
})