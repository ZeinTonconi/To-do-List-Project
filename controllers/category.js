const { ulid } = require("ulid");


const categoryGet = (req, res) => {
    const { pool } = req;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            throw err;
        }
        connection.query(`select * from categories`, (err, result) => {
            if (err) {
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

const categoryPost = (req, res) => {
    const { pool } = req;
    const {category} = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            throw err;
        }
        const id_category = ulid();
        const insertQuery = `INSERT INTO categories (id, category) values ("${id_category}","${category}")`;
        connection.query(insertQuery, (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }
            res.status(200).json({
                msg: 'Se creo la categoria exitosamente',
                id_category
            })
        })
    })

}


const categoryDelete = (req,res) => {
    const {pool} = req;
    const {id} = req.params;
    pool.getConnection((err,connection) => {
        if(err){
            console.log(err);
            throw err;
        }
        const deleteQuery=`DELETE from categories where id="${id}"`;
        connection.query(deleteQuery, (err,result) => {
            if(err){
                console.log(err);
                throw err;
            }
            res.status(200).json({
                msg: "Se elimino exitosamente la categoria"
            })
        })
    })
}
module.exports = {
    categoryGet,
    categoryPost,
    categoryDelete
}