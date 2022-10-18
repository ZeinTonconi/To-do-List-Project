const { Router } = require("express");
const { check } = require("express-validator");
const { tagGet, tagPost } = require("../controllers/tags.controller");
const { validateCamp } = require("../middlewares/validateCamps");
const router = Router();

router.post('/',[
    check('tag','La tag no puede estar vacia').notEmpty(),
    validateCamp
], tagPost);

router.get('/', tagGet);

module.exports = router