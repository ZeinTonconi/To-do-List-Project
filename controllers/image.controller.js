const { ulid } = require('ulid');
const Image = require('../models/Image');
const {uploadImg} = require('../helpers/uploadImg')

const fs = require('fs')

const imagePost = async (req,res) => {
    const {imgName} = req.body;
    const {id_task} = req.params;
    try {
        const id_img = ulid();
        const url = req.location;
        const img = await Image.create({
            id: id_img,
            imgName,
            url,
            id_task
        })
        res.status(201).json({
            msg: "Image created",
            img
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Database Error"
        })  
    }
}

const imageDelete = async (req,res) => {
    const {imgId} = req.params  ;
    try {
        const img = await Image.findOne({
            where:{
                id: imgId
            }
        })
        if(img == null){
            throw new Error("Doesn't exist the Image in the DB");
        }
        const {id, imgName, imgDBName} = img.dataValues;
        const uploadsPath = __dirname + `/../uploads/${imgDBName}`;
        //const uploadsPath = `../uploads/${imgDBName}`;
        const optimizePath = __dirname + `/../optimize/resize-${imgDBName}`;
        //const optimizePath = `../optimize/resize-${imgDBName}`;
        if(fs.existsSync(uploadsPath))
            fs.unlinkSync(uploadsPath);
        if(fs.existsSync(optimizePath))
            fs.unlinkSync(optimizePath);
        await Image.destroy({
            where:{
                id: imgId
            }
        })
        res.status(200).json({
            msg: "Image Deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "DataBase Error"
        })   
    }
}

module.exports = {
    imagePost,
    imageDelete
}