const express = require('express')
const ex = require('express-handlebars')

const app = express()
app.engine('handlebars',engine())
app.set('view engine','handlebars')



app.get('/dashboard',(req,res) => {

    const items = ['caneta','lapis','caderno']
    res.render('dashboard',{items})
    
})

app.get('/post',(req,res) => {
    const post = {
        title: 'Aprender node.js',
        category: 'programação',
        body:' Este artigo vai te ajudar',
        comentario: 4,
    }

    res.render('post',{post})
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