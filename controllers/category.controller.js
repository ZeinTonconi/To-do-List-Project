const { ulid } = require("ulid");
const Category = require("../models/Category");


const categoryGet = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({
            categories
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error in DB"
        })
    }
}

const categoryPost = async (req, res) => {
    const { categoryName } = req.body;
    const id_category = ulid();
    try {
        const category = await Category.create({
            id: id_category,
            categoryName
        })
        res.status(201).json({
            msg: `Se creo la categoria exitosamente con el id = ${id_category}`,
            category
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear la categoria"
        })
    }

}


const categoryDelete = async (req, res) => {
    const { id } = req.params;
    try {

        const category = await Category.destroy({
            where: { id }
        })
        res.status(200).json({
            msg: `Se elimino la categoria con id ${id}`,
            category
        })
    } catch (error) {
        res.status(500).json({
            msg: `No se pudo eliminar la categoria`
        })
    }
}

const categoryPut = async (req, res) => {
    const { id } = req.params;
    const { newCategory } = req.body;
    try {
        const category = await Category.findByPk(id);
        category.categoryName = newCategory;
    
        await category.save();
        res.status(200).json({
            msg: "Category updated",
            category
        })
    } catch (error) {
        console.log(error);
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