const auth = require('express').Router()
const { DbModels } = require('../../modelos/db.config')
const { Op } = require('sequelize')

auth.all('/', async (request, response) => {
  try {
    const { token, user } = request.body

    if (request.session.loggedin !== 'undefined' && session.loggedin) {
      response.status(200).json({
        msj: 'ya estas logueado'
      })
      throw new Error('esta logueado')
    }

    if (!token && !user) {
      response.status(400).json({
        error: 'No puedes realizar una consulta sin "token" comunicate con el administrador para que te proporcione una'
      })
      throw new Error('No puedes realizar una consulta sin "token"')
    }

    const sucursal = await DbModels.tbsucursal.findOne({
      where: {
        [Op.and]: [{
          sucursal_token: token
        },
        {
          sucursal_nombre: user
        }
        ]
      }
    })

    if (!sucursal) {
      throw new Error('no encontrado')
    }
    request.session.loggedin = true
    request.session.idSucursal = sucursal.sucursal_id
    request.session.username = sucursal.sucursal_nombre
    response.status(200).json({
      msj: 'logueado con exito'
    })
  } catch (error) {
    console.log(error)
    response.json(error)
  }
})

module.exports = auth
