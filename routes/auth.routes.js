const { Router } = require("express");
const { check } = require("express-validator");
const { login, postUser } = require("../controllers/auth.controller");
const { validateCamp } = require("../middlewares/validateCamps");


const router = Router();


router.post('/login',[
    
    check('email','No es un email').isEmail(),
    validateCamp
],login)

router.post('/create',[
    check('email',"It has to be a valid email").isEmail(),
    check('password',"You need a Password").notEmpty(),
    validateCamp
],postUser)

module.exports = router;