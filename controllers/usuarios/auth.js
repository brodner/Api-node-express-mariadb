const auth = require('express').Router()
const jwt = require('jsonwebtoken')
const { DbModels } = require('../../modelos/db.config')
const { Op } = require('sequelize')

auth.all('/', async (request, response) => {
  try {
    const { token, user } = request.body

    if (!token && !user) {
      throw Error('tokenOrUser')
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
      throw Error('tokenOrUser')
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
    console.log(request.body)
    if (error.message === 'tokenOrUser') {
      response.status(401).json({
        error: 'usuario o contraseña invalido'
      })
    }
  }
})

module.exports = auth
