const express = require('express')
const router = require('./users')

const app = express()
const port = 3000
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())

app.use('/users', router)

app.use(express.static('public'))


app.listen(port,() => {
    console.log('Servidor rodando na porta',port)
})