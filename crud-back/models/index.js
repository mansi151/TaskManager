'use strict'
const {Sequelize,DataTypes} = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize({
    dialect:'postgres',
    host:process.env.DB_HOST,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})
const models = {
    Contact : require('./contacts')(sequelize,DataTypes),
    User : require('./users')(sequelize,DataTypes),
    Task : require('./tasks')(sequelize,DataTypes)
}
models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models