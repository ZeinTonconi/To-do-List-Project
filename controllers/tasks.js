

const tasksGet = async (req, res) => {

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

const tasksPost = async (req,res) => {
    const {pool} = req;
    const {descr} = req.body;
    pool.getConnection((err,connection) => {
        if(err){
            console.log(err);
            throw err;
        }
        const insertQuery=`INSERT INTO tasks (description, status) VALUES ("${descr}",false)`;
        connection.query(insertQuery, (err,result) => {
            if(err){
                console.log(err);
                throw err;
            }
            const {insertId}=result;
            res.status(201).json({
                msg: `Tarea creada con el task_id ${insertId}`,
                task_id: insertId
            })
        })
    })
}

const tasksDelete = async (req, res) => {
    const {id} = req.params;
    const {pool} =req;
    pool.getConnection((err,connection) => {
        if(err){
            console.log(err);
            throw(err);
        }
        const deleteQuery=`DELETE FROM tasks WHERE id_task=${id}`;
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



const putTask = async(req,res) =>{
    const {pool,params,body} = req;
    const {id} = params;
    const {newDescri} = body;
    pool.getConnection( (err,connection) => {
        if(err){
            console.log(err);
            throw (err);
        }
        const updateQuery = `UPDATE tasks SET description = "${newDescri}" WHERE id_task = ${id}`;
        connection.query(updateQuery, (err,result) => {
            if(err) {
                console.log(err);
                throw(err);
            }
            res.status(200).json({
                msg: `La Tarea con id_tasks = ${id} fue actualizada`
            })
        })
    })
}

const putCompleteTask = async(req,res) =>{
    const {pool,params} = req;
    const {id} = params;
    pool.getConnection( (err,connection) => {
        if(err){
            console.log(err);
            throw (err);
        }
        const completeQuery = `update tasks set status = !status  where id_task=${id};`;
        connection.query(completeQuery, (err,result) => {
            if(err) {
                console.log(err);
                throw(err);
            }
            res.status(200).json({
                msg: `La Tarea con id_tasks = ${id} fue actualizada`,
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