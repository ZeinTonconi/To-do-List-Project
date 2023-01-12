const { ulid } = require('ulid')
const Tag = require('../models/Tag')

const postTag = async (req, res) => {
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
    console.log(error)
    res.status(500).json({
      msg: 'Error trying to create a tag'
    })
  }
}

const getTags = async (req, res) => {
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
    console.log(error)
    res.status(500).json({
      msg: 'DB Error'
    })
  }
}

module.exports = {
  postTag,
  getTags
}
