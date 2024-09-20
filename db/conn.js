const {Sequelize, Model} = require('sequelize')

const sequelize = new Sequelize('meutoughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('conectou com sucesso no banco de dados')
}catch(err){
    console.log(`erro ao conectar no banco de dados, erro: ${err}`)
}

module.exports = sequelize