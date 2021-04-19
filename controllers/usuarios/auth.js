const auth = require('express').Router()
const jwt = require('jsonwebtoken')
const { DbModels } = require('../../modelos/db.config')
const { Op } = require('sequelize')

auth.all('/', async (request, response) => {
  try {
    const { token, user } = request.body

    if (!token && !user) {
      response.status(401).json({
        error: 'No puedes realizar una consulta sin "token" comunicate con el administrador para que te proporcione una'
      })
      throw Error('contraseña o usuario no encontrado o no enviado')
    }

    const sucursal = await DbModels.tbsucursal.findOne({
      where: {
        [Op.and]: [
          { sucursal_token: token },
          { sucursal_nombre: user }
        ]
      }
    })

    if (!sucursal) {
      response.status(401).json({
        msj: 'usuario o token incorrecto por favor verifica'
      })
    }

    const userForToken = {
      idSucursal: sucursal.sucursal_id,
      username: sucursal.sucursal_nombre,
      password: sucursal.sucursal_token
    }

    const tokenRequest = jwt.sign(
      userForToken,
      process.env.SECRET,
      {
        expiresIn: '36d'
      }
    )

    response.status(200).json({
      username: sucursal.sucursal_nombre,
      tokenRequest
    })
  } catch (error) {
    console.log(error)
    response.json(error)
  }
})

module.exports = auth
