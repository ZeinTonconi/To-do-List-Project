
const { Router } = require('express')
const { check } = require('express-validator')
const { imagePost } = require('../controllers/image.controller')
const { tasksGet, tasksPost, tasksDelete, putTask, putCompleteTask, addTag, deleteTag } = require('../controllers/tasks.controller')
const { ErrorResponse } = require('../ErrorResponse')
const { checkJWT } = require('../helpers/check-jwt')
const { isInDB } = require('../helpers/dbValidator')
const { validateCamp } = require('../middlewares/validateCamps')

const router = Router()

router.get('/', [
  checkJWT
], tasksGet)

router.post('/', [
  checkJWT,
  check('descr', 'La Tarea necesita una descripcion').notEmpty(),
  check('idCategory', 'La Tarea necesita una categoria').notEmpty(),
  validateCamp,
  async (req, res, next) => {
    try {
      const { idUser } = req
      if (await isInDB('category', {
        id: req.body.idCategory,
        id_user: idUser
      })) next()
      else {
        throw new ErrorResponse('Category does not exist', 404)
      }
    } catch (error) {
      next(error)
    }
  }
], tasksPost)

router.post('/:idTask/tag', [
  checkJWT,
  check('idTag', 'Se debe incluir el id del tag').notEmpty(),
  validateCamp
], addTag)

router.delete('/:idTask/tag', [
  checkJWT,
  check('idTag', 'Se debe incluir el id del tag').notEmpty(),
  validateCamp
], deleteTag)

router.put('/:id', [
  checkJWT,
  check('id', 'El id esta vacio').notEmpty(),
  validateCamp,
  async (req, res, next) => {
    const { idCategory } = req.body
    const { idUser } = req
    try {
      if (!idCategory || await isInDB('category', { id: idCategory, id_user: idUser })) { next() } else { throw new ErrorResponse('Category does not exist', 404) }
    } catch (error) {
      next(error)
    }
  }
], putTask)

router.put('/:id/complete', [
  checkJWT,
  check('id', 'El id esta vacio').notEmpty(),
  validateCamp
], putCompleteTask)

router.delete('/:id', [
  checkJWT,
  check('id', 'El id esta vacio').notEmpty(),
  validateCamp
], tasksDelete)

router.post('/:idTask/addImage', [
  checkJWT,
  async (req, res, next) => {
    try {
      if (await isInDB('task', { id: req.params.idTask, id_user: req.idUser })) { next() } else throw new ErrorResponse('Task does not exist', 404)
    } catch (error) {
      next(error)
    }
  }
], imagePost)

module.exports = router
