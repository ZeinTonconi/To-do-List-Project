const {Router} = require('express');
const { check } = require('express-validator');
const { imagePost, imageDelete } = require('../controllers/image.controller');
const {upload} = require('../helpers/uploadImg');

const router = Router();

router.post('/',[
    check('imgName', `Must specified the image's Name`).notEmpty(),
    upload.single('file')
], imagePost);

router.delete('/:imgId',[
    check('imgId',`Must specified the image's id`).notEmpty()
], imageDelete);

module.exports = router;