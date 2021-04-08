require('dotenv').config()
const {
  NODE_ENV,
  HOST,
  USER,
  PASSWORD,
  DB,
  HOST_DEV,
  USER_DEV,
  PASSWORD_DEV,
  DB_DEV
} = process.env

let DB_HOST = HOST
let DB_USER = USER
let DB_PASSWORD = PASSWORD
let DB_DB = DB

if (NODE_ENV !== 'production') {
  DB_HOST = HOST_DEV
  DB_USER = USER_DEV
  DB_PASSWORD = PASSWORD_DEV
  DB_DB = DB_DEV
}

module.exports = {
  HOST: DB_HOST,
  USER: DB_USER,
  PASSWORD: DB_PASSWORD,
  DB: DB_DB,
  dialect: 'mariadb',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
