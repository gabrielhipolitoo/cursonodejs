const express = require('express')
const {engine} = require('express-handlebars')

const app = express()
app.engine('handlebars',engine())
app.set('view engine','handlebars')

app.get('/',(req,res) => {
    res.render('home')
})

app.listen(3000,() => {
    console.log('servidor rodando')
})