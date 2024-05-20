const express = require('express')
const exphbs= require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars',exphbs())
app.set('view engine','handlebars')
app.use(express.static('public'))
app.use(express.json())
app.use(
    express.urlencoded({
        extended:true
    })
)



app.get('/',(req,res) => {
    res.render('home')
})

app.get('/books',(req,res) => {
    const query = `SELECT * FROM books;`
    conn.query(query,(err,data) => {
        if(err){
            console.log(err)
        }

        res.render('books',{data})
        //3:22

    })

    
})

app.get('/book/:id',(req,res) => {
    const id = req.params.id

    const query = `SELECT * FROM books WHERE id = ${id}`

    conn.query(query, (err,data) => {
        if(err){
            return console.log(err)
        }
        const book = data[0]
        console.log(book)
        res.render('book',{book})
    })
})


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

