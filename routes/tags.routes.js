const { Router } = require("express");
const { check } = require("express-validator");
const {  postTag, getTags } = require("../controllers/tags.controller");
const { validateCamp } = require("../middlewares/validateCamps");
const router = Router();

router.post('/',[
    check('tagName','La tag no puede estar vacia').notEmpty(),
    validateCamp
], postTag);

router.get('/', getTags);

module.exports = router