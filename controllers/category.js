

const categoryGet = (req,res) => {
    const { pool} = req;
    pool.getConnection((err,connection) => {
        if(err){
            console.log(err);
            throw err;
        }
        connection.query(`select * from categories`, (err, result) => {
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

module.exports = {
    categoryGet
}