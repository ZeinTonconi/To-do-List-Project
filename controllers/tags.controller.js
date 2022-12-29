const { ulid } = require("ulid");
const Tag = require('../models/Tag')
const jwt = require('jsonwebtoken');

const postTag = async (req, res) => {

    const {id_user} =  jwt.verify(req.header('keyToken'),process.env.SECRET_OR_PRIVATEKEY);
    const { tagName } = req.body;
    try {
        const id_tag = ulid();
        const tag = await Tag.create({
            id: id_tag,
            tagName: tagName,
            id_user
        })
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

    let {id_user} =  jwt.verify(req.header('keyToken'),process.env.SECRET_OR_PRIVATEKEY);
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