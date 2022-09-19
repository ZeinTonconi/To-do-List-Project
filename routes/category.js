const { Router } = require("express");
const { categoryGet } = require("../controllers/category");


const router = Router();

router.get('/',categoryGet);


module.exports = router;