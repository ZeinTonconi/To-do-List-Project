const { ulid } = require('ulid')
const { ErrorResponse } = require('../ErrorResponse')
const { isAuthorized } = require('../helpers/auth')
const { Task, Tag, Category, Image } = require('../models/index.models')

const tasksGet = async (req, res, next) => {
  const { idUser } = req
  try {
    const tasks = await Task.findAll({
      where: {
        id_user: idUser
      },
      attributes: {
        exclude: ['id_user']
      },
      include: [{
        model: Tag,
        through: {
          attributes: []
        }
      },
      {
        model: Category,
        attributes: {
          exclude: ['id_user']
        }
      },
      {
        model: Image
      }
      ]

    })
    res.status(200).json({
      tasks
    })
  } catch (error) {
    next(error)
  }
}

const tasksPost = async (req, res, next) => {
  const { idUser } = req
  const { descr, idCategory } = req.body
  try {
    const idTask = ulid()
    const category = await Category.findByPk(idCategory)
    const newTask = await Task.create({
      id: idTask,
      description: descr,
      id_category: idCategory,
      id_user: idUser
    })
    res.status(201).json({
      msg: 'Task created',
      newTask,
      category
    })
  } catch (error) {
    next(error)
  }
}

const tasksDelete = async (req, res, next) => {
  const { id } = req.params
  try {
    const task = await Task.findOne({
      where: { id }
    })
    if (!task) {
      throw new ErrorResponse('Task does not exist', 404)
    }
    isAuthorized(req, task)
    await task.destroy()
    res.status(201).json({
      msg: 'The task has been eliminated'
    })
  } catch (error) {
    next(error)
  }
}

const putTask = async (req, res, next) => {
  const { id } = req.params
  const { newDescri, newCategory } = req.body
  if (!newDescri && !newCategory) {
    res.status(200).json({
      msg: 'No element has been updated'
    })
    return
  }
  try {
    const task = await Task.findByPk(id)
    if (!task) {
      throw new ErrorResponse('Task does not exist', 404)
    }
    isAuthorized(req, task)
    if (newDescri) { task.description = newDescri }
    if (newCategory) { task.id_category = newCategory }
    await task.save()
    const category = await Category.findByPk(newCategory)
    res.status(200).json({
      msg: 'Task updated',
      task,
      category
    })
  } catch (error) {
    next(error)
  }
}

const putCompleteTask = async (req, res, next) => {
  const { id } = req.params
  try {
    const task = await Task.findByPk(id)
    if (!task) {
      throw new ErrorResponse('Task does not exist', 404)
    }
    isAuthorized(req, task)
    task.status = !task.status
    await task.save()
    res.status(200).json({
      msg: 'Task updated',
      task
    })
  } catch (error) {
    next(error)
  }
}

const addTag = async (req, res, next) => {
  const idTask = req.params.idTask
  const { idTag } = req.body
  try {
    const task = await Task.findByPk(idTask)
    const tag = await Tag.findByPk(idTag)
    if (!task) {
      throw new ErrorResponse('Task does not exist', 404)
    }
    if (!tag) {
      throw new ErrorResponse('Tag does not exist', 404)
    }
    isAuthorized(req, task)
    isAuthorized(req, tag)
    await task.addTag(tag)
    res.status(201).json({
      msg: 'Tag added',
      task
    })
  } catch (error) {
    next(error)
  }
}
const deleteTag = async (req, res, next) => {
  const { idTask } = req.params
  const { idTag } = req.body
  try {
    const task = await Task.findByPk(idTask)
    const tag = await Tag.findByPk(idTag)
    if (!task) {
      throw new ErrorResponse('Task does not exist', 404)
    }
    if (!tag) {
      throw new ErrorResponse('Tag does not exist', 404)
    }
    isAuthorized(req, task)
    isAuthorized(req, tag)
    await task.removeTag(tag)
    res.status(201).json({
      msg: 'The tag has been eliminated',
      task
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  tasksGet,
  tasksPost,
  tasksDelete,
  putTask,
  putCompleteTask,
  addTag,
  deleteTag
}
