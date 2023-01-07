const { ulid } = require("ulid");
const { isAuthorized } = require("../helpers/auth");
const {Task, Tag, Category, Image} = require('../models/index.models');

const tasksGet = async (req, res) => {
    const {id_user} = req;
    try {
        const tasks = await Task.findAll({
            where:{
                id_user
            },
            attributes: {
                exclude: ["id_user"]
            },
            include: [{
                model: Tag,
                through: {
                    attributes: []
                },
            },
            {
                model: Category,
                attributes:{
                    exclude: ["id_user"]
                }
            },
            {
                model: Image     
            }
        ],
            
        });
        res.status(200).json({
            tasks
        })

    } catch (error) {
        if(!(error instanceof ErrorResponse)){
            error=new ErrorResponse("Error trying to get all tasks",500,{error});
        }
        res.status(error.errorType).json({
            msg: error.message,
            reasons: error.reasons
        })
    }
}


const tasksPost = async (req, res) => {
    const {id_user} = req;
    const { descr, id_category } = req.body;
    try {
        const id_task = ulid();
        const newTask = await Task.create({
            id: id_task,
            description: descr,
            id_category,
            id_user
        })
        res.status(201).json({
            msg: `Task created`,
            newTask
        })
    } catch (error) {
        if(!(error instanceof ErrorResponse)){
            error=new ErrorResponse("Error trying to create a task",500,{error});
        }
        res.status(error.errorType).json({
            msg: error.message,
            reasons: error.reasons
        })
    }
}

const tasksDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({
            where: { id }
        })
        isAuthorized(req,task);
        await Task.destroy(task)
        res.status(201).json({
            msg: `The task has been eliminated`
        })
    } catch (error) {
        if(!(error instanceof ErrorResponse)){
            error=new ErrorResponse("Error trying to delete the task",500,{error});
        }
        res.status(error.errorType).json({
            msg: error.message,
            reasons: error.reasons
        })
    }
}



const putTask = async (req, res) => {
    const { id } = req.params;
    const { newDescri, newCategory } = req.body;
    if (!newDescri && !newCategory) {
        res.status(200).json({
            msg: "No element has been updated"
        });
        return;
    }
    try {
        let task = await Task.findByPk(id);
        isAuthorized(req,task);
        if (newDescri)
            task.description = newDescri;
        if (newCategory)
            task.id_category = newCategory;
        await task.save();
        res.status(200).json({
            msg: `Task updated`,
            task
        })
    } catch (error) {
        if(!(error instanceof ErrorResponse)){
            error=new ErrorResponse("Error trying to update the task",500,{error});
        }
        res.status(error.errorType).json({
            msg: error.message,
            reasons: error.reasons
        })
    }
}

const putCompleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        isAuthorized(req,task);
        task.status = !task.status;
        await task.save();
        res.status(200).json({
            msg: `Task updated`,
            task
        })

    } catch (error) {
        if(!(error instanceof ErrorResponse)){
            error=new ErrorResponse("Error trying to complete/uncomplete the task",500,{error});
        }
        res.status(error.errorType).json({
            msg: error.message,
            reasons: error.reasons
        })
    }
}

const addTag = async (req, res) => {
    const id_task = req.params.idTask;
    const { id_tag } = req.body;
    try {
        const task = await Task.findByPk(id_task);
        const tag = await Tag.findByPk(id_tag);
        isAuthorized(req,task);
        isAuthorized(req,tag);
        await task.addTag(tag);
        res.status(201).json({
            msg: "Tag added",
            task
        })
    } catch (error) {
        if(!(error instanceof ErrorResponse)){
            error=new ErrorResponse("Error trying to add a tag to the task",500,{error});
        }
        res.status(error.errorType).json({
            msg: error.message,
            reasons: error.reasons
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
