
const isTaskInDB = (req, res, next) => {
    const { id } = req.params;
    
    const { pool } = req;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            throw err;
        }
        let queryExist=`
        SELECT id FROM tasks WHERE id="${id}";
        `;
        connection.query(queryExist, (err, result) => {
            console.log(queryExist,id);
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

const isCategoryInDB = (req,res,next) => {
    const {pool} =req;
    const {id_category} = req.body;
    pool.getConnection((err,connection) => {
        if(err){
            console.log(err);
            throw err;
        }
        connection.query(`select * from categories where id = "${id_category}";`, (err,result) => {
            if(err){
                console.log(err);
                throw err;
            }
            if((result.length === 0)){
                return res.status(404).json({
                    msg: `La categoria no existe en la DB`
                })
            }
            next();
        })
    })
}

module.exports ={
    isTaskInDB,
    isUserInDB,
    isCategoryInDB
}