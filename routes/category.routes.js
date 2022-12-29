const { Router } = require("express");
const { categoryGet, categoryPost, categoryDelete, categoryPut } = require("../controllers/category.controller");
const { check } = require('express-validator');
const { validateCamp } = require("../middlewares/validateCamps");
const { isInDB } = require("../helpers/dbValidator");
const { checkJWT } = require("../helpers/check-jwt");
const jwt = require('jsonwebtoken')

const router = Router();

router.get('/', categoryGet);

router.post('/', [
    checkJWT,
    check('categoryName', 'Se necesita la categoria').notEmpty(),
    validateCamp
], categoryPost)

router.delete('/:id', [
    checkJWT,
    check('id', 'Se necesita el id de la categoria').notEmpty(),
    validateCamp,
    async (req, res, next) => {
        const { id } = req.params;
        const {id_user} = await jwt.verify(req.header("keyToken"));
        if (await isInDB('category', { id, id_user }))
            next();
        else return res.status(404);
    }
], categoryDelete)

router.put('/:id', [
    checkJWT,
    check('id', 'Se necesita el id de la categoria').notEmpty(),
    check('newCategory', 'La nueva categoria no puede estar vacia').notEmpty(),
    async(req,res,next) => {
        const {id} = req.params;
        const {id_user} = await jwt.verify(req.header("keyToken"));
        if(await isInDB('category',{id,id_user}))
            next();
        else return res.status(404);
    },
    validateCamp
], categoryPut)


module.exports = router;