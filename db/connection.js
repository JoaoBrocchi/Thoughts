const Sequelize = require("sequelize")
const dotenv = require("dotenv").config()

const sequelize = new Sequelize(process.env.DATABASE,process.env.USER,process.env.PASSWORD,{host: process.env.HOST, dialect : "mysql"})
try {
        sequelize.authenticate()
        console.log("conectado com sucesso ao banco")
    }

catch (err) {
    console.log("Não foi possivel conectar ao banco", err)
}

module.exports = sequelize
