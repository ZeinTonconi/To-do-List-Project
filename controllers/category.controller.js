const { ulid } = require("ulid");
const Category = require("../models/Category");
const jwt = require('jsonwebtoken');
const { isAuthorized } = require("../helpers/auth");
const { ErrorResponse } = require("../ErrorResponse");


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
            msg: "Error in DB",
            error
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
        res.status(500).json({
            msg: "Error trying to create a category",
            error
        })
    }

}


const categoryDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findOne({
            where:{ id }
        })
        isAuthorized(req,category);
        await category.destroy();
        res.status(200).json({
            msg: `The Category has been deleted`,
            category
        })

    } catch (error) {
        if(!(error instanceof ErrorResponse)){
            console.log(error);
            error=new ErrorResponse("Error trying to delete the category",500,{error});
        }
        res.status(error.errorType).json({
            msg: error.message,
            reasons: error.reasons
        })
    }
}

const categoryPut = async (req, res) => {
    const { id } = req.params;
    const { newCategory } = req.body;
    try {
        const category = await Category.findByPk(id);
        isAuthorized(req,category);
        category.categoryName = newCategory;
        await category.save();
        res.status(200).json({
            msg: "Category updated",
            category
        })
    } catch (error) {
        if(!(error instanceof ErrorResponse)){
            error=new ErrorResponse("Error trying to update a category",500,{error});
        }
        res.status(error.errorType).json({
            msg: error.message
        })
    }
}
module.exports = {
    categoryGet,
    categoryPost,
    categoryDelete,
    categoryPut
}