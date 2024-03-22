const { ulid } = require('ulid')
const Tag = require('../models/Tag')
const { ErrorResponse } = require('../ErrorResponse')
const { isAuthorized } = require('../helpers/auth')

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

const deleteTag = async (req, res, next) => {
  const { id } = req.params
  try {
    const tag = await Tag.findOne({
      where: { id }
    })
    if (!tag) {
      throw new ErrorResponse('Tag does not exist', 404)
    }
    isAuthorized(req, tag)
    await tag.destroy()
    res.status(200).json({
      msg: 'The Tag has been deleted',
      tag
    })
  } catch (error) {
    next(error)
  }
}

const putTag = async (req, res, next) => {
  const { id } = req.params
  const { newTag } = req.body
  try {
    const tag = await Tag.findByPk(id)
    if (!tag) {
      throw new ErrorResponse('Tag does not exist', 404)
    }
    isAuthorized(req, tag)
    tag.tagName = newTag
    await tag.save()
    res.status(200).json({
      msg: 'Tag Updated',
      tag
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postTag,
  getTags,
  deleteTag,
  putTag
}
