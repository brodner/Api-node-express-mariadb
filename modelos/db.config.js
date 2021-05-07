const dbConfig = require('../db.conf.js')
const { Sequelize, Op } = require('sequelize')
const initModels = require('./init-models')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    freezeTableName: true
  }
})

const DbModels = initModels(sequelize)

module.exports = { DbModels, sequelize, Op }
