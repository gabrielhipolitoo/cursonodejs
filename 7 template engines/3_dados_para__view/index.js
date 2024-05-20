const express = require('express')
const {engine} = require('express-handlebars')

const app = express()
app.engine('handlebars',engine())
app.set('view engine','handlebars')

app.get('/',(req,res) => {

    const user = {
        name:"Gabriel",
        idade:24,
    }

    const auth = true
    res.render('home',{user:user,auth})
})

app.listen(3000,() => {
    console.log('servidor rodando')
})