

const tasksGet = async (req, res) => {

    const { pool, DB="tasks"} = req;
    pool.getConnection((err,connection) => {
        if(err){
            console.log(err);
            throw err;
        }
        connection.query(`select * from ${DB}`, (err, result) => {
            if(err){
                console.log(err);
                throw err;
            }
            res.status(200).json({
                result
            });
            connection.release();
        });

    })
}

module.exports = {
    tasksGet
}