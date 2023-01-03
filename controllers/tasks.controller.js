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
                model: Image,
                attributes: [
                    "id", "imgName", "imgDBName"
                ]       
            }
        ],
            
        });
        res.status(200).json({
            tasks
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: "Not Found"
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
        console.log(error);
        res.status(500).json({
            msg: "Error trying to create a task"
        })
    }
}

const tasksDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({
            where: { id }
        })
        isAuthorized(req,res,task);
        await Task.destroy(task)
        res.status(201).json({
            msg: `The task has been eliminated`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error trying to delete the task`
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
        isAuthorized(req,res,task);
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
        console.log(error);
        res.status(500).json({
            msg: 'DB Error'
        })
    }
}

const putCompleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        isAuthorized(req,res,task);
        task.status = !task.status;
        await task.save();
        res.status(200).json({
            msg: `Task updated`,
            task
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "DB Error"
        })
    }
}

const addTag = async (req, res) => {
    const id_task = req.params.idTask;
    const { id_tag } = req.body;
    try {
        const task = await Task.findByPk(id_task);
        const tag = await Tag.findByPk(id_tag);
        isAuthorized(req,res,task);
        isAuthorized(req,res,tag);
        await task.addTag(tag);
        res.status(201).json({
            msg: "Tag added",
            task
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error trying to add a tag to a task"
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
