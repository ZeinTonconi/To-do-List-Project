

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
        const insertQuery=`INSERT INTO tasks (description, status) VALUES ("${descr}",true)`;
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

module.exports = {
    tasksGet,
    tasksPost,
    tasksDelete
}