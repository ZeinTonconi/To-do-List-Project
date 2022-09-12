
const { Router } = require('express');
const { check } = require('express-validator');
const { tasksGet, tasksPost } = require('../controllers/tasks');
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

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        msg: `Delete - Elimiar tarea ${id}`
    })
})


module.exports = router