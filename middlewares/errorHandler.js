const { ErrorResponse } = require('../ErrorResponse')

const errorHandler = (error, req, res, next) => {
  console.log('error', error)
  if (error instanceof ErrorResponse) {
    return res.status(error.errorType).json({
      msg: error.message,
      reasons: error.reasons
    })
  }
  // if (error instanceof ErrorAuthorization) {
  //     return res.status(404).json({
  //         msg: 'Unauthorized',
  //     })
  // }

  reportError(error, req)
  return res.status(500).json({
    msg: error.message
  })
}

const reportError = (error, req) => {
  console.log('error server', { error, req })
}

module.exports = {
  errorHandler
}
