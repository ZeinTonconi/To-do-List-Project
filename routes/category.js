const { Router } = require("express");
const { categoryGet, categoryPost, categoryDelete, categoryPut } = require("../controllers/category");
const {check} = require('express-validator');
const { validateCamp } = require("../middlewares/validateCamps");


const router = Router();

router.get('/',categoryGet);

router.post('/',[
    check('category','Se necesita la categoria').notEmpty(),
    validateCamp
],categoryPost)

router.delete('/:id',[
    check('id','Se necesita el id de la categoria').notEmpty(),
    validateCamp
],categoryDelete)

router.put('/:id',[
    check('id','Se necesita el id de la categoria').notEmpty(),
    check('newCategory','La nueva categoria no puede estar vacia').notEmpty(),
    validateCamp
],categoryPut)

module.exports = router;