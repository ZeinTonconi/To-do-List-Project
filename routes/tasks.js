
const {Router} = require('express');

const router = Router();

router.get('/',(req,res) => {
    res.json({
        msg: 'Get - tasks'
    })
})

module.exports =router