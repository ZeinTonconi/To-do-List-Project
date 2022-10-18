const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { isUserInDB } = require("../helpers/dbValidator");
const { validateCamp } = require("../middlewares/validateCamps");


const router = Router();


router.post('/login',[
    check('email','No es un email').isEmail(),
    validateCamp,
    isUserInDB
],login)


module.exports = router;