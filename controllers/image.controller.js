const { ulid } = require('ulid')
const Image = require('../models/Image')
require('express')
require('express-fileupload')

const fs = require('fs')
const { ErrorResponse } = require('../ErrorResponse')
const path = require('path')

const imagePost = async (req, res, next) => {
  const { idTask } = req.params
  try {
    if (!req.files.file) {
      throw new ErrorResponse('There is no image', 400)
    }

    const idImg = ulid()
    const image = req.files.file
    const location = `./uploads/${image.name}`
    image.mv(location)

    const img = await Image.create({
      id: idImg,
      imgName: image.name,
      location,
      id_task: idTask
    })
    res.status(201).json({
      msg: 'Image created',
      img
    })
  } catch (error) {
    next(error)
  }
}

const imageDelete = async (req, res, next) => {
  const { imgId } = req.params
  try {
    const img = await Image.findOne({
      where: {
        id: imgId
      }
    })
    if (!img) {
      throw new ErrorResponse("Doesn't exist the Image", 404)
    }
    const { imgName } = img.dataValues
    const uploadsPath = path.join(__dirname, `/../uploads/${imgName}`)
    // const uploadsPath = `../uploads/${imgDBName}`;
    if (fs.existsSync(uploadsPath)) { fs.unlinkSync(uploadsPath) }
    await Image.destroy({
      where: {
        id: imgId
      }
    })
    res.status(200).json({
      msg: 'Image Deleted'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  imagePost,
  imageDelete
}
