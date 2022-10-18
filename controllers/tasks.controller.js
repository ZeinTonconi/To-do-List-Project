const { ulid } = require("ulid");
require('mysql2')

const tasksGet = async (req, res) => {
    try {

        const { connection, pool } = req;
        let query = `select tasks.id id_task, description, status, tasks.id_category from tasks`;
        let [tasks] = await connection.query(query);
        let idCategories = tasks.map((task) => task.id_category);
        idCategories = new Set(idCategories);
        idCategories = [...idCategories];
        const queryCate = `select categories.id id_category, category from categories where id in ("${idCategories.join('","')}")`;
        const [obtainCate2] = await connection.query(queryCate, []);
        res.status(201).json({

            obtainCate2: obtainCate2
        })
    } catch (error) {
        res.json({error});
    }
}

const tasksGet1 = async (req, res) => {
    console.time("categories");
    console.time('relations');
    console.time("tags")
    const { connection, pool } = req;
    try {
        let query = `select tasks.id id_task, description, status, tasks.id_category from tasks`;
        let [tasks] = await connection.query(query);
        let idCategories = tasks.map((task) => task.id_category);
        idCategories = new Set(idCategories);
        idCategories = [...idCategories];
        const queryCate = `select categories.id id_category, category from categories where id in ("${idCategories.join('","')}")`;

        // const obtainCate = new Promise(async (resolve, reject) => {
        //     try {
        //         const [categories] = await connection.execute(queryCate);
        //         console.timeLog("categories");
        //         resolve({ categories });
        //     } catch (error) {
        //         reject({
        //             msg: "Error en la DB"
        //         })
        //     }
        // })

        const obtainCate = await pool.query(queryCate, []);

        // pool.query(queryCate, [], (err, results, fields) => {
        //     if (err) {
        //         console.log(err);
        //         reject(err);
        //     }
        //     console.timeLog("categories");
        //     resolve({ categories: results });
        // });


        let idTasks = tasks.map((task) => task.id_task);
        const queryTaskTag = `select * from taskTag where id_task in ("${idTasks.join(`","`)}")`;
        // const obtainTaskTag = new Promise( (resolve, reject) => {
        //     try {
        //         pool.query(queryTaskTag, [], (err, taskTag, fields) => {
        //             if (err) {
        //                 console.log(err);
        //                 reject(err);
        //             }
        //             console.timeLog('relations')
        //             resolve(taskTag);
        //         });
        //     } catch (error) {
        //         reject(error)
        //     }
        // })

        const obtainTaskTag = new Promise(async (resolve, reject) => {
            try {
                const [taskTag] = await connection.query(queryTaskTag, []);
                console.timeLog('relations')
                resolve(taskTag);
            } catch (error) {
                reject(error)
            }
        })

        const promiseTag = new Promise((resolve, reject) => {
            obtainTaskTag.then((taskTag) => {
                let idTags = taskTag.map((relation) => relation.id_tag);
                idTags = new Set(idTags);
                idTags = [...idTags];
                const queryTag = `select tags.id id_tag, tagName from tags where id in ("${idTags.join(`","`)}")`;
                pool.query(queryTag, [], (err, tags, fields) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    let mapTag = new Map();
                    tags.forEach(tag => {
                        mapTag[tag.id_tag] = tag.tagName;
                    });
                    console.timeLog("tags");
                    resolve({ taskTag, mapTag });
                })
            }
            )
                .catch((err) => {
                    reject(err);
                })
        })

        // const promiseTag = new Promise((resolve, reject) => {
        //     obtainTaskTag.then(async (taskTag) => {
        //         try {
        //             let idTags = taskTag.map((relation) => relation.id_tag);
        //             idTags = new Set(idTags);
        //             idTags = [...idTags];
        //             const queryTag = `select tags.id id_tag, tagName from tags where id in ("${idTags.join(`","`)}")`;
        //             const [tags] = await connection.execute(queryTag);
        //             let mapTag = new Map();
        //             tags.forEach(tag => {
        //                 mapTag[tag.id_tag] = tag.tagName;
        //             });
        //             console.timeLog("tags");
        //             resolve({ taskTag, mapTag });
        //         }
        //         catch (err) {
        //             console.log(err);
        //             reject(err);
        //         }
        //     }
        //     )
        //         .catch((err) => {
        //             reject(err);
        //         })
        // })

        // start:
        // console.time();
        // end:
        // console.timeEnd();
        // Mostrar
        // console.timeLog();


        Promise.all([obtainCate, promiseTag])
            .then((result) => {
                const { categories } = result[0];
                const { taskTag, mapTag } = result[1];
                tasks = tasks.map(task => {
                    let category = categories.find((category) => category.id_category === task.id_category);
                    let actualTags = taskTag.filter(relation => relation.id_task === task.id_task);
                    actualTags = actualTags.map((tag) => mapTag[tag.id_tag]);
                    task.tags = actualTags;
                    task.category = category;
                    return task;
                });

                console.timeEnd("categories");
                console.timeEnd('relations');
                console.timeEnd("tags")

                res.status(200).json({
                    tasks
                })
            })
            .catch(error => {
                console.log(error);
                res.status(404).json({
                    msg: error
                })
            });


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