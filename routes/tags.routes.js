const { Router } = require('express')
const { check } = require('express-validator')
const { postTag, getTags } = require('../controllers/tags.controller')
const { checkJWT } = require('../helpers/check-jwt')
const { validateCamp } = require('../middlewares/validateCamps')
const router = Router()

router.post('/', [
  checkJWT,
  check('tagName', 'La tag no puede estar vacia').notEmpty(),
  validateCamp
], postTag)

router.get('/', [
  checkJWT,
  validateCamp
], getTags)

module.exports = router
