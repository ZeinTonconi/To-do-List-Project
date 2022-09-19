const { Router } = require("express");
const { categoryGet, categoryPost } = require("../controllers/category");
const {check} = require('express-validator');
const { validateCamp } = require("../middlewares/validateCamps");


const router = Router();

router.get('/',categoryGet);

router.post('/',[
    check('category','Se necesita la categoria').notEmpty(),
    validateCamp
],categoryPost)


module.exports = router;