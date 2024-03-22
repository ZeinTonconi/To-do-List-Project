const { Router } = require('express')
const { check } = require('express-validator')
const { login, postUser, checkToken } = require('../controllers/auth.controller')
const { validateCamp } = require('../middlewares/validateCamps')
const { checkJWT } = require('../helpers/check-jwt')

const router = Router()

router.post('/login', [

  check('email', 'No es un email').isEmail(),
  validateCamp
], login)

router.post('/create', [
  check('email', 'It has to be a valid email').isEmail(),
  check('password', 'You need a Password').notEmpty(),
  validateCamp
], postUser)

router.get('/check-token', [
  checkJWT
], checkToken)

module.exports = router
