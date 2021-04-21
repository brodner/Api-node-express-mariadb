require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const auth = require('./controllers/usuarios/auth')
const crearCliente = require('./controllers/clientes/crearCliente')
const crudCliente = require('./controllers/clientes/crudClientes')
const { DbModels, sequelize } = require('./modelos/db.config')
const tokenExtractor = require('./middleware/tokerExtractor')
const PORT = process.env.PORT || 5000
app.use(cors())

app.use(express.json())
app.use(express.static('public'))

app.use('/auth', auth)

app.get('/', (request, response) => {
  console.log(request.ip)
  console.log(request.ips)
  console.log(request.originalUrl)
  response.location('./public')
})

app.use(tokenExtractor, crudCliente)

app.use(async (request, response, next) => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    response.status(404).json({
      msg: 'Unable to connect to the database contact with group data Base'
    })
  }
})

app.use('/clientes/', tokenExtractor, crearCliente)

app.get('/clientes/:id', tokenExtractor, async (request, response) => {
  const {
    id
  } = request.params

  try {
    const objtsujeto = await DbModels.tbcliente.findByPk(id, {
      where: {
        statuscli_id: 5
      },
      include: {
        all: true,
        attributes: {
          exclude: ['sucursal_token', 'tipoide_dsc']
        }
      }
    })
    const dataSujeto = await objtsujeto.dataValues
    response.status(201).json(
      dataSujeto
    )
  } catch (error) {
    response.status(404).json(error)
  }
})

app.get('/clientes', tokenExtractor, async (request, response) => {
  try {
    const objtsujeto = await DbModels.tbcliente.findAll({
      where: {
        statuscli_id: 5
      },
      include: {
        all: true,
        attributes: {
          exclude: ['sucursal_token', 'tipoide_dsc']
        }
      }
    })
    response.status(201).json(
      objtsujeto
    )
  } catch (error) {
    console.log(error)
    response.status(404).json(error.name)
  }
})

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
