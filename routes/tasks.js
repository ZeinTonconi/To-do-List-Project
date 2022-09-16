
const { Router } = require('express');
const { check } = require('express-validator');
const { tasksGet, tasksPost, tasksDelete, putTask } = require('../controllers/tasks');
const { isTaskInDB } = require('../helpers/dbValidator');
const { validateCamp } = require('../middlewares/validateCamps');



const router = Router();
  

router.get('/', tasksGet);

router.post('/', [
    check('descr','La Tarea necesita una descripcion').notEmpty(),
    validateCamp
], tasksPost )

router.put('/:id', [
    check('id',"El id no es valido").isNumeric(),
    validateCamp,
    isTaskInDB
], putTask)

router.put('/:id/complete', (req, res) => {
    const { id } = req.params;
    res.json({
        msg: `Put - Completar Tarea ${id}`
    })
})

router.delete('/:id',[
    check('id').isNumeric(),
    validateCamp,
    isTaskInDB
],tasksDelete)


module.exports = router