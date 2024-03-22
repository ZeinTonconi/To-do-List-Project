const { generateJWT } = require('../helpers/generateJWT')
const { ulid } = require('ulid')

const User = require('../models/User')
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
      token,
      user
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
    const user = {
      id: idUser,
      email,
      password
    }
    await User.create(user)
    res.status(201).json({
      msg: 'User Created',
      user
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'DB Error'
    })
  }
}

const checkToken = async (req, res) => {
  const { idUser } = req
  const user = await User.findByPk(idUser)
  res.status(200).json({
    user,
    token: req.header('keyToken')
  })
}

module.exports = {
  login,
  postUser,
  checkToken
}
