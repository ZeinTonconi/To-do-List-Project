const jwt = require('jsonwebtoken')

const generateJWT = (idUser) => {
  return new Promise((resolve, reject) => {
    const payload = { idUser }
    jwt.sign(payload, process.env.SECRET_OR_PRIVATEKEY, {
      expiresIn: process.env.LIFE_JWT
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject(new Error('No se pudeo generar el token'))
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = {
  generateJWT
}
