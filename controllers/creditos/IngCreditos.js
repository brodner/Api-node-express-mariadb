const express = require('express')
const dbConfig = require('../../db.conf')
const router = express.Router()
const mysql = require('mysql')

const dbConect = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true
})

dbConect.connect(function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Conexion a base de datos correcta')
  }
})

router.post('/creditos/ingresar', (req, res) => {
  const {
    id_credito,
    monto
  } = req.body
  const query = `
    SET @id_credito = ?;
    SET @monto = ?;
    CALL sp_movscreditos(@id_credito, @monto);
    `
  dbConect.query(query, [id_credito,monto], (error, rows) => {
    if (!error) {
      console.log(rows)
      res.json(rows[3][0])
    } else {
      console.log(error)
    }
  })
})

module.exports = router
