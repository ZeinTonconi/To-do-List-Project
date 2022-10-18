
const { Router } = require('express');
const { check } = require('express-validator');
const { tasksGet, tasksPost, tasksDelete, putTask, putCompleteTask, addTag } = require('../controllers/tasks.controller');
const { checkJWT } = require('../helpers/check-jwt');
const { isTaskInDB, isCategoryInDB, isInDB } = require('../helpers/dbValidator');
const { validateCamp } = require('../middlewares/validateCamps');
const Category = require('../models/Category');



const router = Router();


router.get('/', [
    //checkJWT
], tasksGet);

router.post('/', [
    //checkJWT,
    check('descr', 'La Tarea necesita una descripcion').notEmpty(),
    check('id_category', 'La Tarea necesita una categoria').notEmpty(),
    validateCamp,
    async (req, res, next) => {
        try {
            if (await isInDB(Category, {
                id: req.body.id_category
            })) next();
            else return res.status(404).json({
                msg: "Not Found"
            })
        } catch (error) {
            return res.status(500).json({
                msg: "DB Error"
            })
        }
    },
], tasksPost)

router.post('/:idTask/tag', [
    //checkJWT,
    check('id_tag', 'Se debe incluir el id del tag').notEmpty(),
    validateCamp
], addTag)

router.put('/:id', [
    //checkJWT,
    check('id', "El id esta vacio").notEmpty(),
    validateCamp,

    isTaskInDB,
    (req, res, next) => {
        if (req.body.id_category)
            isCategoryInDB
        next();
    }
], putTask)

router.put('/:id/complete', [
    //checkJWT,
    check('id', 'El id esta vacio').notEmpty(),
    validateCamp,
    isTaskInDB
], putCompleteTask)

router.delete('/:id', [
    //checkJWT,
    check('id', "El id esta vacio").notEmpty(),
    validateCamp,
    isTaskInDB
], tasksDelete)


module.exports = router