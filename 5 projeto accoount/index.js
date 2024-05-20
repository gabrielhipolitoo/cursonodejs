const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");

console.log("Inciamos o Accounts");

const typeAction = {
  "Criar Conta": () => {
    createAccount();
  },
  "Consultar Saldo": () => {},
  Depositar: () => {
    deposit();
  },
  Sacar: () => {
    withdraw();
  },
  Sair: () => {
    console.log(chalk.bgBlue.black("Obrigado por usar o Accounts"));
    process.exit();
  },
};

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      }, // 3:49
    ])
    .then((answer) => {
      const action = answer["action"];
      const formatNameAction = action;

      return typeAction[action]();
    })
    .catch((err) => console.log(err));
}

function createAccount() {
  console.log(chalk.bgGreen.black("Parabens por escolher o nosso banco"));
  console.log(chalk.green("Defina as opcões da sua conta"));

  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      } else if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed("Essa conta ja existe"));
        return buildAccount();
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        `{"balance":0}`,
        function (err) {
          return console.log("Erro >>>", err);
        }
      );

      console.log(chalk.bgGreen("Conta criada com sucesso !!!"));
      return operation();
    });
}

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Insira o nome da sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        console.log("aqui");
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Insira o valor do deposito",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];
          depositAndWithdraw(accountName, amount, "deposit");
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("Essa conta não existe teste"));
    return false;
  }

  return true;
}

function depositAndWithdraw(accountName, amount, accountAction) {
  const accountData = getAccount(accountName);
  console.log(accountData);

  if (!amount) {
    console.log(chalk.bgRed.black("Erro, tente novamente mais tarde"));
    return deposit();
  } else if (accountAction === "deposit") {
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

    fs.writeFileSync(
      `accounts/${accountName}.json`,
      JSON.stringify(accountData)
    );

    console.log(chalk.green(`Valor depositado ${amount} na sua conta`));
    return operation;
  } else if (accountAction === "withdraw") {
    if (parseFloat(amount) > parseFloat(accountData.balance)) {
      console.log(chalk.bgRed.black("Saldo insuficiente"));
      return withdraw;
    } else {
      accountData.balance =
        parseFloat(accountData.balance) - parseFloat(amount);

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData)
      );

      console.log(chalk.green(`Valor sacado ${amount} da sua conta`));
      return operation;
    }
  }
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
}

function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja sacar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];
          depositAndWithdraw(accountName, amount, "withdraw");
          console.log(amount);
          operation();
        })

        .catch((err) => console.log(err));
    });
}

operation();
