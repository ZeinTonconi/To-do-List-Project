const { ulid } = require("ulid");


const categoryGet = async (req, res) => {
    const { connection } = req;
    try {
        const query = `select * from categories`;
        const [categories] = await connection.execute(query);
        res.status(200).json({
            categories
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al buscar en la DB"
        })
    }
}

const categoryPost = async (req, res) => {
    const { connection } = req;
    const { category } = req.body;
    const id_category = ulid();
    const query = `INSERT INTO categories (id, category) values ("${id_category}","${category}")`;
    try {
        await connection.execute(query);
        res.status(200).json({
            msg: `Se creo la categoria exitosamente con el id = ${id_category}`,
            id_category
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al crear la categoria"
        })
    }

}


const categoryDelete = async (req, res) => {
    const { connection } = req;
    const { id } = req.params;
    const query = `DELETE from categories where id="${id}"`;
    try {
        await connection.execute(query);
        res.status(200).json({
            msg: `Se elimino la categoria con id ${id}`
        })
    } catch (error) {
        res.status(500).json({
            msg: `No se pudo eliminar la categoria`
        })
    }
}

const categoryPut = async (req, res) => {
    const { connection } = req;
    const { id } = req.params;
    const { newCategory } = req.body;
    const query = `UPDATE categories SET category = "${newCategory}" where id="${id}"`;
    try {
        await connection.execute(query);
        res.status(200).json({
            msg: `Se actualizo la categoria con id: ${id} por ${newCategory}`
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al actualizar la DB"
        })
    }
}
module.exports = {
    categoryGet,
    categoryPost,
    categoryDelete,
    categoryPut
}