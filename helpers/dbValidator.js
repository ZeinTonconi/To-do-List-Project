
const isTaskInDB = async (req, res, next) => {
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
                return res.status(401).json({
                    msg: `La tarea con id ${id} no existe en la DB`
                });
            }
            next();
        })
    })
}

module.exports ={
    isTaskInDB
}