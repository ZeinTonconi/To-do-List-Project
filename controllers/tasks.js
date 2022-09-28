const { ulid } = require("ulid");


const tasksGet = (req, res) => {

    const { pool} = req;
    pool.getConnection((err,connection) => {
        if(err){
            console.log(err);
            throw err;
        }
        connection.query(`select * from tasks`, (err, result) => {
            if(err){
                console.log(err);
                throw err;
            }
            res.status(200).json({
                ...result

            });
            connection.release();
        });

    })
}




const tasksPost = (req,res) => {
    const {pool, id_category} = req;
    const {descr, category} = req.body;
    pool.getConnection((err,connection) => {
        if(err){
            console.log(err);
            throw err;
        }
        console.log(id_category);
        const id_task=ulid();
        const insertQuery=`INSERT INTO tasks (id,description, id_category, status) VALUES ("${id_task}","${descr}","${id_category}",false)`;
        connection.query(insertQuery, (err,result) => {
            if(err){
                console.log(err);
                throw err;
            }
            const {insertId}=result;
            res.status(201).json({
                msg: `Tarea creada con el task_id ${insertId}`,
                task_id: insertId,
                descr,
                category,
                status: false
            })
        })
    })
}

const tasksDelete = (req, res) => {
    const {id} = req.params;
    const {pool} =req;
    pool.getConnection((err,connection) => {
        if(err){
            console.log(err);
            throw(err);
        }
        const deleteQuery=`DELETE FROM tasks WHERE id="${id}";`;
        connection.query(deleteQuery,(err,result)=> {
            if(err){
                console.log(err);
                throw err;
            }
            res.status(200).json({
                msg: `La tarea con id ${id} se elimino correctamente`
            })
        })
    })
}



const putTask = (req,res) =>{
    const {pool,params,body} = req;
    const {id} = params;
    const {newDescri} = body;
    pool.getConnection( (err,connection) => {
        if(err){
            console.log(err);
            throw (err);
        }
        const updateQuery = `UPDATE tasks SET description = "${newDescri}" WHERE id = ${id}`;
        connection.query(updateQuery, (err,result) => {
            if(err) {
                console.log(err);
                throw(err);
            }
            res.status(200).json({
                msg: `La Tarea con id = ${id} fue actualizada`
            })
        })
    })
}

const putCompleteTask = (req,res) =>{
    const {pool,params} = req;
    const {id} = params;
    pool.getConnection( (err,connection) => {
        if(err){
            console.log(err);
            throw (err);
        }
        const completeQuery = `update tasks set status = not status  where id=${id};`;
        connection.query(completeQuery, (err,result) => {
            if(err) {
                console.log(err);
                throw(err);
            }
            res.status(200).json({
                msg: `La Tarea con id = ${id} fue actualizada`,
            })
        })
    })
}

module.exports = {
    tasksGet,
    tasksPost,
    tasksDelete,
    putTask,
    putCompleteTask
}