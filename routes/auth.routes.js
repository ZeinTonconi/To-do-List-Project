const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { validateCamp } = require("../middlewares/validateCamps");


const router = Router();


router.post('/login',[
    check('email','No es un email').isEmail(),
    validateCamp
],login)


module.exports = router;