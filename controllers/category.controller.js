const { ulid } = require('ulid')
const Category = require('../models/Category')
const { isAuthorized } = require('../helpers/auth')
const { ErrorResponse } = require('../ErrorResponse')

const categoriesGet = async (req, res) => {
  const { idUser } = req
  try {
    const categories = await Category.findAll({
      where: {
        idUser
      }
    })
    res.status(200).json({
      categories
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error in DB',
      error
    })
  }
}

const categoryGet = async (req, res) => {
  const { idUser } = req
  const { id } = req.params

  try {
    const category = await Category.findOne({
      where: {
        id,
        idUser
      }
    })
    if (!category) {
      throw new ErrorResponse('Category does not exist', 404)
    }

    res.status(200).json({
      category
    })
  } catch (error) {
    // throw error

    // res.status(500).json({
    //     msg: "Error in DB",
    //     error
    // })
  }
}

const categoryPost = async (req, res) => {
  const { categoryName } = req.body
  const { idUser } = req

  const idCategory = ulid()
  try {
    const category = await Category.create({
      id: idCategory,
      categoryName,
      id_user: idUser
    })
    const { id_user: a, ...returnCate } = category.dataValues
    res.status(201).json({
      msg: 'The new Category has been created',
      returnCate
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error trying to create a category',
      error
    })
  }
}

const categoryDelete = async (req, res) => {
  const { id } = req.params
  try {
    const category = await Category.findOne({
      where: { id }
    })
    isAuthorized(req, category)
    await category.destroy()
    res.status(200).json({
      msg: 'The Category has been deleted',
      category
    })
  } catch (error) {
    let returnError = error
    if (!(error instanceof ErrorResponse)) {
      console.log(error)
      returnError = new ErrorResponse('Error trying to delete the category', 500, { error })
    }
    res.status(returnError.errorType).json({
      msg: returnError.message,
      reasons: returnError.reasons
    })
  }
}

const categoryPut = async (req, res) => {
  const { id } = req.params
  const { newCategory } = req.body
  try {
    const category = await Category.findByPk(id)
    isAuthorized(req, category)
    category.categoryName = newCategory
    await category.save()
    res.status(200).json({
      msg: 'Category updated',
      category
    })
  } catch (error) {
    let returnError = error
    if (!(error instanceof ErrorResponse)) {
      console.log(error)
      returnError = new ErrorResponse('Error trying to update a category', 500, { error })
    }
    res.status(returnError.errorType).json({
      msg: returnError.message,
      reasons: returnError.reasons
    })
  }
}
module.exports = {
  categoryGet,
  categoryPost,
  categoryDelete,
  categoryPut,
  categoriesGet
}
