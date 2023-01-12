const { Router } = require('express')
const { check } = require('express-validator')
const { imagePost, imageDelete } = require('../controllers/image.controller')
const { checkJWT } = require('../helpers/check-jwt')
const { isInDB } = require('../helpers/dbValidator')
const { upload } = require('../helpers/uploadImg')
const { validateCamp } = require('../middlewares/validateCamps')

const router = Router()

router.post('/', [
  checkJWT,
  check('imgName', 'Must specified the image\'s Name').notEmpty(),
  upload.single('file')
], imagePost)

router.delete('/:imgId', [
  checkJWT,
  check('imgId', 'Must specified the image\'s id').notEmpty(),
  async (req, res, next) => {
    const { imgId } = req.params
    try {
      if (await isInDB('image', { id: imgId })) next()
      else {
        return res.status(404).json({
          msg: 'Not Found'
        })
      }
    } catch (error) {
      return res.status(404).json({
        msg: 'Not Found'
      })
    }
  },
  validateCamp
], imageDelete)

module.exports = router
