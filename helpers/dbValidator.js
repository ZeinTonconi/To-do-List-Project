const { ErrorResponse } = require('../ErrorResponse')
const { database } = require('../models/index.models')
const DB = database

const isInDB = async (dataBase, params) => {
  const model = DB[dataBase]
  if (!model) {
    return new ErrorResponse('Model isn\'t in the DB', 404)
  }
  const element = await model.findOne({
    where: params
  })
  return (element !== null)
}

module.exports = {
  isInDB
}
