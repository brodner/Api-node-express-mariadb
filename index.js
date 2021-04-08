require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./models')
const DbModels = require('./modelos/db.config')
const PORT = process.env.PORT || 5000

const model = async () => {
  try {
    await db.sequelize.sync({
      // force: true
    })
    await db.fuentes.create({
      origen: 'Primera Carga'
    })

    await db.estados.create({
      estado: 'Activo'
    })
  } catch (error) {
    console.log(error)
  }
}
// model()

const corsOption = {
  origin: 'localhost:8081'
}
app.use(cors())
app.use(express.json())

app.post('/clientes', async (req, res) => {
  const contenido = req.body
  try {
    console.log(contenido)
    const Sujetos = await db.sujetos.create({
      primerNombre: contenido.primerNombre,
      segundoNombre: contenido.segundoNombre,
      primerApellido: contenido.primerApellido,
      segundoApellido: contenido.segundoApellido,
      fechaNacimiento: contenido.fechaNacimiento
    })
    res.json({
      message: 'Se inserto el cliente'
    })
  } catch (error) {
    const objtError = error.message
    res.status(404).json({
      objtError
    })
  }
})

app.get('/clientes/:id', async (request, response) => {
  const {
    id
  } = request.params

  try {
    const objtsujeto = await DbModels.tbcliente.findByPk(id, {
      where: {
        statuscli_id: 1
      },
      include: {
        all: true,
        attributes: {
          exclude: ['sucursal_token', 'tipoide_dsc']
        }
      }
    })
    // const objtsujeto = await db.sujetos.findByPk(id)
    const dataSujeto = await objtsujeto.dataValues
    // await console.log(dataSujeto);
    response.json(
      dataSujeto
    )
  } catch (error) {
    response.status(404).json(error)
  }
})

app.get('/clientes', async (request, response) => {
  try {
    // const objtsujeto = await db.sujetos.findAll()
    const objtsujeto = await DbModels.tbcliente.findAll({
      where: {
        statuscli_id: 1
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
    response.status(404).json(error.name)
  }
})

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
