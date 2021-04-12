const postClientes = require('express').Router()
const { DbModels } = require('../../modelos/db.config')
const { Op } = require('sequelize')

postClientes.post('/', async (req, res) => {
  const contenido = req.body
  const date = new Date()
  const dateComplite = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  try {
    const [cliente, existeCliente] = await DbModels.tbcliente.findOrCreate({
      where: {
        [Op.or]: [
          { cliente_ide: contenido.id },
          {
            [Op.and]: [{
              cliente_nombre1: {
                [Op.substring]: contenido.nombres
              },
              cliente_ape1: {
                [Op.substring]: contenido.primerApellido
              },
              cliente_ape2: {
                [Op.substring]: contenido.segundoApellido
              },
              cliente_fnac: contenido.fechaNacimiento
            }]
          }
        ]
      },
      include: {
        all: true,
        attributes: {
          exclude: ['sucursal_token', 'tipoide_dsc']
        }
      },
      defaults: {
        cliente_ide: contenido.id,
        cliente_nombre1: contenido.nombres,
        cliente_ape1: contenido.primerApellido,
        cliente_ape2: contenido.segundoApellido,
        cliente_fcreacion: dateComplite,
        cliente_fnac: contenido.fechaNacimiento,
        statuscli_id: '1',
        sucursal_id: '1',
        tipoide_id: contenido.tipoide
      }
    })
    if (existeCliente) {
      res.json({
        message: 'Se inserto el cliente'
      })
    } else {
      res.json({
        msg: 'Se econtro un cliente con las caracteristicas enviadas',
        cliente
      })
    }
  } catch (error) {
    const objtError = error.message
    console.log(objtError)
    const ValidationData = objtError.split('Validation error: ')
    res.status(404).json({
      ValidationData
    })
  }
})

module.exports = postClientes
