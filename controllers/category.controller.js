const { ulid } = require("ulid");
const Category = require("../models/Category");
const jwt = require('jsonwebtoken');
const { isAuthorized } = require("../helpers/auth");


const categoryGet = async (req, res) => {
    const {id_user}=req;
    try {
        const categories = await Category.findAll({
            where: {
                id_user
            }
        });
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
    const {id_user} = req;
    const id_category = ulid();
    try {
        const category = await Category.create({
            id: id_category,
            categoryName,
            id_user
        });
        const {id_user:a, ...returnCate} = category.dataValues;
        res.status(201).json({
            msg: `The new Category has been created`,
            returnCate
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error trying to create a category"
        })
    }

}


const categoryDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findOne({
            where:{ id }
        })
        isAuthorized(req,res,category);
        await Category.destroy(category);
        res.status(200).json({
            msg: `The Category has been deleted`,
            category
        })

    } catch (error) {
        res.status(500).json({
            msg: `Error trying to delete a category`,
            error
        })
    }
}

const categoryPut = async (req, res) => {
    const { id } = req.params;
    const { newCategory } = req.body;
    try {
        const category = await Category.findByPk(id);
        isAuthorized(req,res,category);
        category.categoryName = newCategory;
        await category.save();
        res.status(200).json({
            msg: "Category updated",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error trying to update the category"
        })
    }
}
module.exports = {
    categoryGet,
    categoryPost,
    categoryDelete,
    categoryPut
}