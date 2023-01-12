const { ulid } = require('ulid')
const { ErrorResponse } = require('../ErrorResponse')
const { isAuthorized } = require('../helpers/auth')
const { Task, Tag, Category, Image } = require('../models/index.models')

const tasksGet = async (req, res) => {
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
    let returnError = error
    if (!(error instanceof ErrorResponse)) {
      console.log(error)
      returnError = new ErrorResponse('Error trying to get all tasks', 500, { error })
    }
    res.status(returnError.errorType).json({
      msg: returnError.message,
      reasons: returnError.reasons
    })
  }
}

const tasksPost = async (req, res) => {
  const { idUser } = req
  const { descr, idCategory } = req.body
  try {
    const idTask = ulid()
    const newTask = await Task.create({
      id: idTask,
      description: descr,
      id_category: idCategory,
      id_user: idUser
    })
    res.status(201).json({
      msg: 'Task created',
      newTask
    })
  } catch (error) {
    let returnError = error
    if (!(error instanceof ErrorResponse)) {
      console.log(error)
      returnError = new ErrorResponse('Error trying to create the tasks', 500, { error })
    }
    res.status(returnError.errorType).json({
      msg: returnError.message,
      reasons: returnError.reasons
    })
  }
}

const tasksDelete = async (req, res) => {
  const { id } = req.params
  try {
    const task = await Task.findOne({
      where: { id }
    })
    isAuthorized(req, task)
    await Task.destroy(task)
    res.status(201).json({
      msg: 'The task has been eliminated'
    })
  } catch (error) {
    let returnError = error
    if (!(error instanceof ErrorResponse)) {
      console.log(error)
      returnError = new ErrorResponse('Error trying to delete the tasks', 500, { error })
    }
    res.status(returnError.errorType).json({
      msg: returnError.message,
      reasons: returnError.reasons
    })
  }
}

const putTask = async (req, res) => {
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
    isAuthorized(req, task)
    if (newDescri) { task.description = newDescri }
    if (newCategory) { task.id_category = newCategory }
    await task.save()
    res.status(200).json({
      msg: 'Task updated',
      task
    })
  } catch (error) {
    let returnError = error
    if (!(error instanceof ErrorResponse)) {
      console.log(error)
      returnError = new ErrorResponse('Error trying to update the task', 500, { error })
    }
    res.status(returnError.errorType).json({
      msg: returnError.message,
      reasons: returnError.reasons
    })
  }
}

const putCompleteTask = async (req, res) => {
  const { id } = req.params
  try {
    const task = await Task.findByPk(id)
    isAuthorized(req, task)
    task.status = !task.status
    await task.save()
    res.status(200).json({
      msg: 'Task updated',
      task
    })
  } catch (error) {
    let returnError = error
    if (!(error instanceof ErrorResponse)) {
      console.log(error)
      returnError = new ErrorResponse('Error trying to complete/uncomplete all tasks', 500, { error })
    }
    res.status(returnError.errorType).json({
      msg: returnError.message,
      reasons: returnError.reasons
    })
  }
}

const addTag = async (req, res) => {
  const idTask = req.params.idTask
  const { idTag } = req.body
  try {
    const task = await Task.findByPk(idTask)
    const tag = await Tag.findByPk(idTag)
    isAuthorized(req, task)
    isAuthorized(req, tag)
    await task.addTag(tag)
    res.status(201).json({
      msg: 'Tag added',
      task
    })
  } catch (error) {
    let returnError = error
    if (!(error instanceof ErrorResponse)) {
      console.log(error)
      returnError = new ErrorResponse('Error trying to add the tag to the task', 500, { error })
    }
    res.status(returnError.errorType).json({
      msg: returnError.message,
      reasons: returnError.reasons
    })
  }
}

module.exports = {
  tasksGet,
  tasksPost,
  tasksDelete,
  putTask,
  putCompleteTask,
  addTag
}
