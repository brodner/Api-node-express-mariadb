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

/**
 * ingresamos pago
 */
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
      res.json(rows[8][0])
    } else {
      console.log(error)
    }
  })
})

/**
 * inserta la solictud de credito para ser preautoriza (se autoriza al instante)
 * cred_tipo [credito_cod]
 */
router.post('/creditos/registrar', (req, res) => {
  const {
    dpi,
    descripcion,
    monto,
    diapago,
    cred_tipo,
    sucursal
  } = req.body
  const query = `
    SET @operacion = 1;
    SET @id = '0';
    SET @dpi = ?;
    SET @descripcion = ?;
    SET @monto = ?;
    SET @diapago = ?;
    SET @cred_tipo = ?;
    SET @sucursal = ?;
    CALL sp_mant_credito(@operacion,@id, @dpi, @descripcion, @monto,@diapago, @cred_tipo, @sucursal);
    `

    let data= 
  dbConect.query(
    query,
    [
      dpi,
      descripcion,
      monto,
      diapago,
      cred_tipo,
      sucursal
    ],
    (error, rows, fields) => {
      if (!error) {
        console.log(rows)
        res.json(rows[8][0])
      } else {
        console.log(error)
      }
    }
  )
})
/** 
 * 
*/
router.put('/creditos/actualizar', (req, res) => {
  const {
    id,
    dpi,
    descripcion,
    diapago,
    cred_tipo,
    sucursal
  } = req.body
  const query = `
        SET @operacion = 3;
        SET @id = ?;
        SET @dpi = ?;
        SET @descripcion = ?;
        SET @monto = '';
        SET @diapago = ?;
        SET @cred_tipo = ?;
        SET @sucursal = ?;
        CALL sp_mant_credito(@operacion,@id, @dpi, @descripcion, @monto,@diapago, @cred_tipo, @sucursal);
        `
  dbConect.query(
    query,
    [
      id,
      dpi,
      descripcion,
      diapago,
      cred_tipo,
      sucursal
    ],
    (error, rows) => {
      if (!error) {
        console.log(rows)
        res.json(rows[8][0])
      } else {
        res.json(error)
        console.log(error)
      }
    }
  )
})

router.delete('/creditos/eliminar', (req, res) => {
  const {
    id,
    dpi,
    sucursal
  } = req.body
  const query = `
        SET @operacion = 2;
        SET @id = ?;
        SET @dpi = ?;
        SET @desc = '';
        SET @monto = '';
        SET @diapago ='';
        SET @cred_tipo = '';
        SET @sucursal = '';
        CALL sp_mant_credito(@operacion,@id, @dpi, @desc, @monto,@diapago, @cred_tipo, @sucursal);
        `
  dbConect.query(
    query,
    [
      id,
      dpi,
      sucursal
    ],
    (error, rows) => {
      if (!error) {
        console.log(rows)
        res.json(rows[8][0])
      } else {
        res.json(error)
        console.log(error)
      }
    }
  )
})

module.exports = router
