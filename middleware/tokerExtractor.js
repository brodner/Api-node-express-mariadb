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

    //   const { id: userId } = decodedToken

    //   request.id = userId

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
