const { Router } = require('express')
const { categoryGet, categoryPost, categoryDelete, categoryPut, categoriesGet } = require('../controllers/category.controller')
const { check } = require('express-validator')
const { validateCamp } = require('../middlewares/validateCamps')
const { checkJWT } = require('../helpers/check-jwt')

const router = Router()

router.get('/', checkJWT, categoriesGet)

router.get('/:id', [checkJWT], categoryGet)

router.post('/', [
  checkJWT,
  check('categoryName', 'Se necesita la categoria').notEmpty(),
  validateCamp
], categoryPost)

router.delete('/:id', [
  checkJWT,
  check('id', 'Se necesita el id de la categoria').notEmpty(),
  validateCamp
], categoryDelete)

router.put('/:id', [
  checkJWT,
  check('id', 'Se necesita el id de la categoria').notEmpty(),
  check('newCategory', 'La nueva categoria no puede estar vacia').notEmpty(),
  validateCamp
], categoryPut)

module.exports = router
