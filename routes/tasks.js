
const {Router} = require('express');

const router = Router();

router.get('/',(req,res) => {
    res.json({
        msg: 'Get - tasks'
    })
})

router.post('/',(req,res) => {
    res.json({
        msg: 'Post - tasks'
    })
})

router.put('/:id',(req,res) => {
    const {id}=req.params;
    res.json({
        msg: `Put - Actualizar tarea ${id}`
    })
})

router.put('/:id/complete',(req,res) =>{
    const {id}=req.params;
    res.json({
        msg: `Put - Completar Tarea ${id}`
    })
})

router.delete('/:id',(req,res) => {
    const {id}=req.params;
    res.json({
        msg: `Delete - Elimiar tarea ${id}`
    })
})
module.exports =router