
const { Router } = require('express');
const { check } = require('express-validator');
const { tasksGet, tasksPost, tasksDelete, putTask, putCompleteTask } = require('../controllers/tasks');
const { isTaskInDB } = require('../helpers/dbValidator');
const { validateCamp } = require('../middlewares/validateCamps');



const router = Router();
  

router.get('/', tasksGet);

router.post('/', [
    check('descr','La Tarea necesita una descripcion').notEmpty(),
    check('category', 'La Tarea necesita una categoria').notEmpty(),
    validateCamp
], tasksPost )

router.put('/:id', [
    check('id',"El id no es valido").isNumeric(),
    validateCamp,
    isTaskInDB
], putTask)

router.put('/:id/complete', [
    check('id', 'El id no es valido').isNumeric(),
    validateCamp,
    isTaskInDB
], putCompleteTask)

router.delete('/:id',[
    check('id').isNumeric(),
    validateCamp,
    isTaskInDB
],tasksDelete)


module.exports = router