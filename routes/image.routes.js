const { Router } = require('express')
const { check } = require('express-validator')
const { imageDelete } = require('../controllers/image.controller')
const { checkJWT } = require('../helpers/check-jwt')
const { validateCamp } = require('../middlewares/validateCamps')

const router = Router()

router.delete('/:imgId', [
  checkJWT,
  check('imgId', 'Must specified the image\'s id').notEmpty(),
  validateCamp
], imageDelete)

module.exports = router
