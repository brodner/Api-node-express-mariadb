require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const app = express()
const { DbModels, sequelize } = require('./modelos/db.config')
const crearCliente = require('./controllers/clientes/crearCliente')
const auth = require('./controllers/usuarios/auth')
const tokenExtractor = require('./middleware/tokerExtractor')
const PORT = process.env.PORT || 5000
app.use(cors())

app.use(session({
  secret: 'central Banco-Vivienda',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(express.json())

app.use('/auth', auth)

app.get('/', (request, response) => {
  console.log(request.ip)
  console.log(request.ips)
  console.log(request.originalUrl)
  response.send('<h1>API WEB BANCO DE VIVIENDA</h1>')
})

app.use(async (request, response, next) => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    next()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    response.status(404).json({
      msg: 'Unable to connect to the database contact with group data Base'
    })
  }
})

app.use('/clientes/', crearCliente)

app.get('/clientes/:id', tokenExtractor, async (request, response, next) => {
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
    response.json(
      dataSujeto
    )
  } catch (error) {
    response.status(401).json(error)
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
    response.json(
      objtsujeto
    )
  } catch (error) {
    console.log(error)
    response.status(401).json(error.name)
  }
})

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
