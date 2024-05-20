const inquirer = require('inquirer')

inquirer.prompt([{
    name: 'p1',
    message:'Qual seu nome'
},{
    name: 'p2',
    message:'onde voce mora'
}]).then((answers) => {
    console.log(answers)
}).catch((err) => console.log(err))