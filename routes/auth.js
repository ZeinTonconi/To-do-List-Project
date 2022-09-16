const { Router } = require("express");


const router = Router();


router.post('/login',(req,res) => {
    res.json({
        msg: 'Te logeaste!!'
    })
})


module.exports = router;