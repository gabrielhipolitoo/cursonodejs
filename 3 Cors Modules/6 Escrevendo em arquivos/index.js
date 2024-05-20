const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 3000;

const serve = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true);
  const name = urlInfo.query.name;


  if(!name){
    fs.readFile("index.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
  }

  else{
    fs.appendFile('arquivo.txt',name, (err,data) => {
        res.writeHead(302,{
            location:'/'
        })
        return res.end()
    })
  }

  
});

serve.listen(port, () => {
  console.log("Servidor rodando na porta");
});
