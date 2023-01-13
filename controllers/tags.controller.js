const { ulid } = require('ulid')
const Tag = require('../models/Tag')

const postTag = async (req, res, next) => {
  const { idUser } = req
  const { tagName } = req.body
  try {
    const idTag = ulid()
    const tag = await Tag.create({
      id: idTag,
      tagName,
      id_user: idUser
    })
    res.status(201).json({
      msg: 'Tag has been created',
      tag
    })
  } catch (error) {
    next(error)
  }
}

const getTags = async (req, res, next) => {
  const { idUser } = req
  try {
    const tags = await Tag.findAll({
      where: {
        id_user: idUser
      }
    })
    res.status(200).json({
      tags
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postTag,
  getTags
}
