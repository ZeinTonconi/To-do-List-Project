module.exports.ErrorResponse = class ErrorResponse {
    constructor (message, errorType, reasons = {}) {
      this.message = message
      this.errorType = errorType
      this.reasons = reasons
    }
  }