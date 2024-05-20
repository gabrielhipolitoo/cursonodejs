const http = require("http");
const fs = require('fs')
const port = 3000;

const serve = http.createServer((req, res) => {
  fs.readFile('mensagen.html',function (err,data){
    res.writeHead(200,{'Content-Type':'text/html'})
    res.write(data)
    return res.end()
  })
});

serve.listen(port, () => {
  console.log("Servidor rodando na porta");
});
