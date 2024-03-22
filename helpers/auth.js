const { ErrorResponse } = require('../ErrorResponse')

const isAuthorized = (req, object) => {
  if (object.id_user !== req.idUser) {
    throw new ErrorResponse('You are not authorized!', 403)
  }
}

module.exports = {
  isAuthorized
}
