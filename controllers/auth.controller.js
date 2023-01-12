const { generateJWT } = require('../helpers/generateJWT')
const User = require('../models/User')
const { ulid } = require('ulid')
const { ErrorResponse } = require('../ErrorResponse')

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({
      where: {
        email,
        password
      }
    })
    if (!user) {
      throw new ErrorResponse('User Not Found!', 404)
    }
    const token = await generateJWT(user.id)
    res.status(200).json({
      msg: 'Logged in',
      token
    })
  } catch (error) {
    if (error instanceof ErrorResponse) {
      res.status(error.errorType).json({
        msg: error.message
      })
    } else {
      res.status(500).json({
        msg: error
      })
    }
  }
}

const postUser = async (req, res) => {
  const { email, password } = req.body
  const idUser = ulid()
  try {
    await User.create({
      id: idUser,
      email,
      password
    })
    res.status(201).json({
      msg: 'User Created'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'DB Error'
    })
  }
}

module.exports = {
  login,
  postUser
}
