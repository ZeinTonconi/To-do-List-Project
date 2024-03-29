const jwt = require('jsonwebtoken')

const checkJWT = (req, res, next) => {
  const token = req.header('keyToken')
  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    })
  }

  try {
    const { idUser } = jwt.verify(token, process.env.SECRET_OR_PRIVATEKEY)
    req.idUser = idUser
    next()
  } catch (err) {
    res.status(401).json({
      msg: 'Token no valido'
    })
  }
}

module.exports = {
  checkJWT
}
