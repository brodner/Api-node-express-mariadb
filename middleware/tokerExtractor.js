const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  try {
    const authorization = request.get('authorization')
    let token = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.idSucursal) {
      console.log('Error')
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const { idSucursal, username, password } = decodedToken

    request.body.sucursal = idSucursal
    request.body.user = username
    request.body.password = password

    next()
  } catch (error) {
    console.log(error.message)
    if (error.message === 'jwt must be provided' ||
        error.message === 'invalid signature') {
      response.status(401).json({
        error: 'token missing or invalid'
      })
    }
  }
}
