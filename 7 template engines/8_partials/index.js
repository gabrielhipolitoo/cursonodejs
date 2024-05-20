const express = require('express')
const engine = require('express-handlebars')

const app = express()

const hbs = engine.create({
    partialsDir:["views/partial"]

})

app.engine('handlebars',hbs.engine)
app.set('view engine','handlebars')



app.get('/dashboard',(req,res) => {

    const items = ['caneta','lapis','caderno']
    res.render('dashboard',{items})
    
})

app.get('/blog',(req,res)=>{
    const posts = {
        title: 'Aprender node.js',
        category: 'programação',
        body:' Este artigo vai te ajudar',
        comentario: 4,
    }

    res.render('blog',{posts})
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