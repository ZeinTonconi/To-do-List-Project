
const { Router } = require('express');
const { check } = require('express-validator');
const { tasksGet, tasksPost, tasksDelete, putTask, putCompleteTask } = require('../controllers/tasks');
const { checkJWT } = require('../helpers/check-jwt');
const { isTaskInDB, isCategoryInDB } = require('../helpers/dbValidator');
const { validateCamp } = require('../middlewares/validateCamps');



const router = Router();
  

router.get('/', [
    checkJWT
],tasksGet);

router.post('/', [
    checkJWT,
    check('descr','La Tarea necesita una descripcion').notEmpty(),
    check('id_category', 'La Tarea necesita una categoria').notEmpty(),
    validateCamp
], tasksPost )

router.put('/:id', [
    checkJWT,
    check('id',"El id esta vacio").notEmpty(),
    validateCamp,
    isTaskInDB
], putTask)

router.put('/:id/complete', [
    checkJWT,
    check('id', 'El id esta vacio').notEmpty(),
    validateCamp,
    isTaskInDB
], putCompleteTask)

router.delete('/:id',[
    checkJWT,
    check('id',"El id esta vacio").notEmpty(),
    validateCamp,
    isTaskInDB
],tasksDelete)


module.exports = router