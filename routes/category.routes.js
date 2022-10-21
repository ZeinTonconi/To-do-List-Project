const { Router } = require("express");
const { categoryGet, categoryPost, categoryDelete, categoryPut } = require("../controllers/category.controller");
const { check } = require('express-validator');
const { validateCamp } = require("../middlewares/validateCamps");
const { isCategoryInDB, isInDB } = require("../helpers/dbValidator");


const router = Router();

router.get('/', categoryGet);

router.post('/', [
    check('categoryName', 'Se necesita la categoria').notEmpty(),
    validateCamp
], categoryPost)

router.delete('/:id', [
    check('id', 'Se necesita el id de la categoria').notEmpty(),
    validateCamp,
    async (req, res, next) => {
        const { id } = req.params;
        if (await isInDB('category', { id }))
            next();
        else return res.status(404);
    }
], categoryDelete)

router.put('/:id', [
    check('id', 'Se necesita el id de la categoria').notEmpty(),
    check('newCategory', 'La nueva categoria no puede estar vacia').notEmpty(),
    validateCamp
], categoryPut)


module.exports = router;