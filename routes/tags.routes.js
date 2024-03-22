const { Router } = require('express')
const { check } = require('express-validator')
const { postTag, getTags, deleteTag, putTag } = require('../controllers/tags.controller')
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

router.delete('/:id', [
  checkJWT,
  check('id', 'We need the id of the tag').notEmpty(),
  validateCamp
], deleteTag)

router.put('/:id', [
  checkJWT,
  check('id', 'We need the id of the tag').notEmpty(),
  check('newTag', 'The new Tag name can not be empty').notEmpty(),
  validateCamp
], putTag)

module.exports = router
