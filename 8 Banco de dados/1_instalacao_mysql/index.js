const express = require('express')
const {engine} = require('express-handlebars')
const mysql = require('mysql')

const app = express()


app.engine('handlebars',engine)
app.set('view engine','handlebars')
app.use(express.static('public'))

app.get('/',(req,res) => {
    res.render('home')
})

const conn = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'nodemysql'
})

conn.connect((err) => {
    if(err)
    {
        console.log(err)
    }

    console.log('Banco conectado')
    app.listen(3000)
})