const { Router } = require("express");
const { categoryGet, categoryPost, categoryDelete } = require("../controllers/category");
const {check} = require('express-validator');
const { validateCamp } = require("../middlewares/validateCamps");


const router = Router();

router.get('/',categoryGet);

router.post('/',[
    check('category','Se necesita la categoria').notEmpty(),
    validateCamp
],categoryPost)

router.delete('/',[
    check('id_category','Se necesita el id de la categoria').notEmpty(),
    validateCamp
],categoryDelete)

module.exports = router;