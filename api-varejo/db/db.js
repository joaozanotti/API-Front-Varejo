// Bibliotecas e módulos utilizados
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './varejo.sqlite'
})

try {
  sequelize.authenticate();
  console.log("Banco de dados conectado com sucesso!")

} catch (erro) {
  console.log("Erro ao conectar o banco", erro)
}

module.exports = sequelize;