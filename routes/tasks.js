
const { Router } = require('express');
const { check } = require('express-validator');
const { tasksGet, tasksPost, tasksDelete } = require('../controllers/tasks');
const { isTaskInDB } = require('../helpers/dbValidator');
const { validateCamp } = require('../middlewares/validateCamps');



const router = Router();
  

router.get('/', tasksGet);

router.post('/', [
    check('descr','La Tarea necesita una descripcion').notEmpty(),
    validateCamp
], tasksPost )

router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        msg: `Put - Actualizar tarea ${id}`
    })
})

router.put('/:id/complete', (req, res) => {
    const { id } = req.params;
    res.json({
        msg: `Put - Completar Tarea ${id}`
    })
})

router.delete('/:id',[
    check('id').isNumeric(),
    validateCamp,
    isTaskInDB,
    validateCamp
],tasksDelete)


module.exports = router