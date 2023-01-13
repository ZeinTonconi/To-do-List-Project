const { ulid } = require('ulid')
const Category = require('../models/Category')
const { isAuthorized } = require('../helpers/auth')
const { ErrorResponse } = require('../ErrorResponse')

const categoriesGet = async (req, res, next) => {
  const { idUser } = req
  try {
    const categories = await Category.findAll({
      where: {
        id_user: idUser
      }
    })
    res.status(200).json({
      categories
    })
  } catch (error) {
    next(error)
  }
}

const categoryGet = async (req, res, next) => {
  const { idUser } = req
  const { id } = req.params

  try {
    const category = await Category.findOne({
      where: {
        id,
        id_user: idUser
      }
    })
    if (!category) {
      throw new ErrorResponse('Category does not exist', 404)
    }

    res.status(200).json({
      category
    })
  } catch (error) {
    next(error)
  }
}

const categoryPost = async (req, res, next) => {
  const { categoryName } = req.body
  const { idUser } = req

  const idCategory = ulid()
  try {
    const category = await Category.create({
      id: idCategory,
      categoryName,
      id_user: idUser
    })
    res.status(201).json({
      msg: 'The new Category has been created',
      category
    })
  } catch (error) {
    next(error)
  }
}

const categoryDelete = async (req, res, next) => {
  const { id } = req.params
  try {
    const category = await Category.findOne({
      where: { id }
    })
    if (!category) {
      throw new ErrorResponse('Category does not exist', 404)
    }
    isAuthorized(req, category)
    await category.destroy()
    res.status(200).json({
      msg: 'The Category has been deleted',
      category
    })
  } catch (error) {
    next(error)
  }
}

const categoryPut = async (req, res, next) => {
  const { id } = req.params
  const { newCategory } = req.body
  try {
    const category = await Category.findByPk(id)
    if (!category) {
      throw new ErrorResponse('Category does not exist', 404)
    }
    isAuthorized(req, category)
    category.categoryName = newCategory
    await category.save()
    res.status(200).json({
      msg: 'Category updated',
      category
    })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  categoryGet,
  categoryPost,
  categoryDelete,
  categoryPut,
  categoriesGet
}
