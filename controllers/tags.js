const { ulid } = require("ulid");


const tagPost = (req,res) => {
    const {pool} = req;
    const {tag} = req.body;
    pool.getConnection((err,connection) => {
        if(err){
            console.log(err);
            throw err;
        }
        const id_tag = ulid();
        const insertQuery = `INSERT INTO tags (id,tag) values ("${id_tag}","${tag}");`;
        connection.query(insertQuery, (err,result) => {
            if(err){
                console.log(err);
                throw err;
            }
            res.status(200).json({
                msg: 'Se creo la tag exitosamente',
                id_tag
            })
        })
    })
}

const tagGet = (req,res) => {
    const {pool} = req;
    pool.getConnection((err,connection) => {
        if(err){
            console.log(err);
            throw err;
        }
        connection.query(`SELECT * FROM tags`, (err,result) => {
            if(err) console.log(err);
            res.status(200).json({
                ...result
            })
        })
    })
}

module.exports = {
    tagPost,
    tagGet
}