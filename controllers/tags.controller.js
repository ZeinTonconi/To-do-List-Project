const { ulid } = require("ulid");

const tagPost = async (req,res) =>{
    const {connection} = req;
    const {tagName} = req.body;
    try {
        const id_tag = ulid();
        const query =`INSERT INTO tags (id,tagName) VALUES ("${id_tag}", "${tagName}")`;
        await connection.execute(query);
        res.status(201).json({
            msg: `Tag creado con el id ${id_tag}`,
            id: id_tag,
            tagName
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al crear tag`
        })
    }
}

const tagGet = async (req,res) => {
    const {connection} = req;
    try {
        const query = `SELECT * FROM tags`;
        const [tags]=await connection.execute(query);
        res.status(200).json({
            tags
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al consultar a la DB`
        })
    }
}

module.exports = {
    tagPost,
    tagGet
}