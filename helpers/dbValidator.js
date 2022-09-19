
const isTaskInDB = (req, res, next) => {
    const { id } = req.params;
    
    const { pool } = req;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            throw err;
        }
        let queryExist=`
        SELECT id_task FROM tasks WHERE id_task=${id};
      `;
        connection.query(queryExist, (err, result) => {
            
            if (result.length===0) {
                return res.status(404).json({
                    msg: `La tarea con id ${id} no existe en la DB`
                });
            }
            next();
        })
    })
}

const isUserInDB =  (req,res,next) => {
    const { pool } = req;
    const {email} = req.body;
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                throw err;
            }
            connection.query(`select * from users where email = "${email}"`, (err, result) => {
                if(result.length === 0){
                    return res.status(404).json({
                        msg: `El usuario con ese correo no existe`
                    })
                }
                req.user=result[0];
                next();
                connection.release();
            });

        })
}

module.exports ={
    isTaskInDB,
    isUserInDB
}