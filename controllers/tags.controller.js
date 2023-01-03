const { ulid } = require("ulid");
const { isAuthorized } = require("../helpers/auth");
const Tag = require('../models/Tag')

const postTag = async (req, res) => {
    const {id_user} = req;
    const { tagName } = req.body;
    try {
        const id_tag = ulid();
        const tag = await Tag.create({
            id: id_tag,
            tagName: tagName,
            id_user
        })
        isAuthorized(req,res,tag);
        res.status(201).json({
            msg: `Tag has been created`,
            tag
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error trying to create a tag`
        })
    }
}

const getTags = async (req, res) => {
    const {id_user} = req;
    try {
        const tags = await Tag.findAll({
            where:{
                id_user
            }
        });
        res.status(200).json({
            tags
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `DB Error`
        })
    }
}

module.exports = {
    postTag,
    getTags
}