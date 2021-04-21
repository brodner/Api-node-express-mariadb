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

router.get('/clientes/consulta/:dpi', (req, res) => {
  const {
    user,
    password
  } = req.body
  const { dpi } = req.params
  console.log(user, password)
  const query = `
    SET @dpi = ?;
    SET @user = ?;
    SET @password = ?;
    CALL SP_CONSULTA_CLIENTE(@dpi, @user, @password);
    `
  dbConect.query(query, [dpi, user, password], (error, rows) => {
    if (!error) {
      console.log(rows)
      res.json(rows[3][0])
    } else {
      console.log(error)
    }
  })
})

router.post('/clientes/registro', (req, res) => {
  const {
    operacion,
    dpi,
    name,
    lastNameOne,
    lastNameTwo,
    sucursal,
    typeIde,
    bornDate
  } = req.body
  const query = `
    SET @operacion = 1;
    SET @dpi = ?;
    SET @name = ?;
    SET @lastNameOne = ?;
    SET @lastNameTwo = ?;
    SET @sucursal = ?;
    SET @typeIde = ?;
    SET @bornDate = ?;
    CALL sp_mant_clientes(@operacion, @dpi, @name, @lastNameOne,@lastNameTwo, @sucursal, @typeIde, @bornDate);
    `
  dbConect.query(
    query,
    [
      dpi,
      name,
      lastNameOne,
      lastNameTwo,
      sucursal,
      typeIde,
      bornDate
    ],
    (error, rows) => {
      if (!error) {
        res.json(rows[8][0])
      } else {
        console.log(error)
      }
    }
  )
})

router.put('/clientes/actualizacion', (req, res) => {
  const {
    ope,
    dpi,
    name,
    lastNameOne,
    lastNameTwo,
    sucursal,
    typeIde,
    bornDate
  } = req.body
  const query = `
    SET @ope = 3;
    SET @dpi = ?;
    SET @name = ?;
    SET @lastNameOne = ?;
    SET @lastNameTwo = ?;
    SET @sucursal = ?;
    SET @typeIde = ?;
    SET @bornDate = ?;
    CALL sp_mant_clientes(@ope, @dpi, @name, @lastNameOne,@lastNameTwo, @sucursal, @typeIde, @bornDate);
    `
  dbConect.query(
    query,
    [
      dpi,
      name,
      lastNameOne,
      lastNameTwo,
      sucursal,
      typeIde,
      bornDate
    ],
    (error, rows) => {
      if (!error) {
        res.json(rows[8][0])
      } else {
        res.json(error)
        console.log(error)
      }
    }
  )
})

router.delete('/clientes/administracion', (req, res) => {
  const {
    dpi
  } = req.body
  const query = `
    SET @ope = 2;
    SET @dpi = '';
    SET @name = '';
    SET @lastNameOne = '';
    SET @lastNameTwo = '';
    SET @sucursal = '';
    SET @typeIde = '';
    SET @bornDate = '';
    CALL sp_mant_clientes(@ope, @dpi, @name, @lastNameOne,@lastNameTwo, @sucursal, @typeIde, @bornDate);
    `
  dbConect.query(
    query,
    [
      dpi
    ],
    (error, rows) => {
      if (!error) {
        res.json(rows[8][0])
      } else {
        res.json(error)
        console.log(error)
      }
    }
  )
})

module.exports = router
