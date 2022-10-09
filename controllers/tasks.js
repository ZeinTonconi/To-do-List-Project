const { ulid } = require("ulid");



const tasksGet = async (req, res) => {
    const { connection } = req;

    try {
        let query = `select tasks.id id_task, description, status, tasks.id_category from tasks`;
        let [tasks] = await connection.execute(query);

        let idCategories = tasks.map((task) => task.id_category);
        idCategories = new Set(idCategories);
        idCategories = [...idCategories];

        

        query = `select categories.id id_category, category from categories where id in ("${idCategories.join('","')}")`;
        const [categories] = await connection.execute(query);

        let idTask = tasks.map((task) => task.id_task);
        query = `select * from taskTag where id_task in ("${idTask.join(`","`)}")`;
        const [taskTag] = await connection.execute(query);
        let idTags = taskTag.map((relation) => relation.id_tag);
        idTags = new Set(idTags);
        idTags = [...idTags];
        query = `select tags.id id_tag, tagName from tags where id in ("${idTags.join(`","`)}")`;
        const [tags] = await connection.execute(query);
        let mapTag = new Map();
        tags.forEach(tag => {
            mapTag[tag.id_tag] = tag.tagName;
        });

        tasks = tasks.map(task => {
            let category = categories.find((category) => category.id_category === task.id_category);
            let actualTags = taskTag.filter(relation => relation.id_task === task.id_task);
            actualTags = actualTags.map((tag) => mapTag[tag.id_tag]);
            task.tags = actualTags;
            task.category = category;
            return task;
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
    const { connection } = req;
    const { descr, id_category } = req.body;

    try {
        const id_task = ulid();
        const query = `INSERT INTO tasks (id,description, id_category, status) VALUES ("${id_task}","${descr}","${id_category}",false)`;
        await connection.execute(query)
        res.status(201).json({
            msg: `Tarea creada con el id ${id_task}`,
            id: id_task,
            descr,
            status: false
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear la tarea"
        })
    }
}

const tasksDelete = async (req, res) => {
    const { id } = req.params;
    const { connection } = req;
    const query = `DELETE FROM tasks WHERE id="${id}";`;
    try {
        await connection.execute(query);
        res.status(200).json({
            msg: `La tarea con id ${id} se elimino correctamente`
        })
    } catch (error) {
        res.status(404).json({
            msg: "Not Found"
        })
    }
}



const putTask = async (req, res) => {
    const { connection, params, body } = req;
    const { id } = params;
    const { newDescri, newCategory } = body;
    if (!newDescri && !newCategory) {
        res.status(200).json({
            msg: "No se modifico ningun campo"
        });
        return;
    }
    let query = `UPDATE tasks SET ` + ((newDescri) ? ` description = "${newDescri}" ` : "")
        + ((newCategory) ? ` id_category = "${newCategory}"` : "") + ` WHERE id = "${id}"`;
    try {
        await connection.execute(query);
        res.status(200).json({
            msg: `La Tarea con id = ${id} fue actualizada`
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: 'Not Found'
        })
    }
}

const putCompleteTask = async (req, res) => {
    const { connection, params } = req;
    const { id } = params;
    const query = `update tasks set status = not status  where id="${id}";`;
    try {
        await connection.execute(query);
        res.status(200).json({
            msg: `La Tarea con id = ${id} fue actualizada`
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: "Not found"
        })
    }
}

const addTag = async (req, res) => {
    const { connection } = req;
    const id_task = req.params.idTask;
    const { id_tag } = req.body;
    const id = ulid();
    const query = `INSERT INTO taskTag (id,id_task,id_tag) VALUES ("${id}","${id_task}","${id_tag}")`;
    try {
        console.log(query);
        await connection.execute(query);
        res.status(201).json({
            msg: "Tag creada"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al annadir la Tag a la tarea"
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