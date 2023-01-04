
const { Router } = require('express');
const { check } = require('express-validator');
const { imagePost } = require('../controllers/image.controller');
const { tasksGet, tasksPost, tasksDelete, putTask, putCompleteTask, addTag } = require('../controllers/tasks.controller');
const { checkJWT } = require('../helpers/check-jwt');
const { isInDB } = require('../helpers/dbValidator');
const { upload } = require('../helpers/uploadImg');
const { validateCamp } = require('../middlewares/validateCamps');


const router = Router();


router.get('/', [
    checkJWT
], tasksGet);

router.post('/', [
    checkJWT,
    check('descr', 'La Tarea necesita una descripcion').notEmpty(),
    check('id_category', 'La Tarea necesita una categoria').notEmpty(),
    validateCamp,
    async (req, res, next) => {
        try {
            if (await isInDB('category', {
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
    checkJWT,
    check('id_tag', 'Se debe incluir el id del tag').notEmpty(),
    validateCamp
], addTag)

router.put('/:id', [
    checkJWT,
    check('id', "El id esta vacio").notEmpty(),
    validateCamp,

    async (req, res, next) => {
        const { id } = req.params;
        try {
            if (await isInDB('task', { id }))
                next();
            else
                return res.status(404);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    },
    async (req, res, next) => {
        const { id_category } = req.body; 
        try {
            if (!id_category || await isInDB('category', { id_category }))
                next();
            else
                return res.status(404);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }
], putTask)


router.put('/:id/complete', [
    checkJWT,
    check('id', 'El id esta vacio').notEmpty(),
    validateCamp,
    async(req,res,next) => {
        const {id}=req.params.id;
        try {
            if(await isInDB('task', {id})) next();
            else res.status(404);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }
], putCompleteTask)

router.delete('/:id', [
    checkJWT,
    check('id', "El id esta vacio").notEmpty(),
    validateCamp,
    async(req,res,next) => {
        const {id}=req.params;
        try {
            if(await isInDB('task', {id})) next();
            else return res.status(404).json({
                msg: "Not Found"
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error
            });
        }
    }
], tasksDelete)

router.post('/:id_task/addImage',[
    checkJWT,
    async(req,res, next) => {
        const {id_task} = req.params;
        try {
            if(await isInDB('task', {id:id_task})) next();
            else return req.status(404);
        } catch (error) {   
            return res.status(404);
        }
    }
],imagePost)

module.exports = router