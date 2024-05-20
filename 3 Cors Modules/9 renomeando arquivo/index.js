const fs = require('fs')

fs.rename('arquivo.txt','novoarquivo.txt',(err) => {
    if(!err){
        return console.log('arquivo renomeado')
    }

    return console.log('Erro ao renomear arquivo')
})