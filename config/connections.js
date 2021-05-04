const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_name,
    process.env.DB_user,
    process.env.DB_password,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    }
)

module.exports = sequelize