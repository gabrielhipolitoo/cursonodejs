const express = require('express')
const exphbs= require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars',exphbs())
app.set('view engine','handlebars')
app.use(express.static('public'))

app.get('/',(req,res) => {
    res.render('home')
})

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

app.post('/books/inserirbook',(req,res) =>{
    const title = req.body.title
    const pageqty = req.body.pageqty

    const query = `INSERT INTO books (title,pageqty) VALUES ('${title}','${pageqty}')`

    conn.query(query,(err) => {
        if(err){
            console.log(err)
        }
        
        res.redirect('/')
    })
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

