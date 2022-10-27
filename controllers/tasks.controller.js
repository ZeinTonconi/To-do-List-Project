const { ulid } = require("ulid");
const Tag = require("../models/Tag");
const Task = require("../models/Task");

const tasksGet = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            include: {
                model: Tag,
                through: {
                    attributes: []
                }
            }
            
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
    const { descr, id_category } = req.body;
    try {
        const id_task = ulid();
        const newTask = await Task.create({
            id: id_task,
            description: descr,
            id_category
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
        await Task.destroy({
            where: { id }
        })
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