const express = require('express')
const {engine} = require('express-handlebars')

const app = express()
app.engine('handlebars',engine())
app.set('view engine','handlebars')



app.get('/dashboard',(req,res) => {

    const items = ['caneta','lapis','caderno']
    res.render('dashboard',{items})
    
})

app.get('/',(req,res) => {

    const user = {
        name:"Gabriel",
        idade:24,
    }
    const auth = false
    res.render('home',{user:user,auth})
})

app.listen(3000,() => {
    console.log('servidor rodando')
})