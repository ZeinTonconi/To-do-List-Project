const multer = require('multer');
const sharp = require('sharp');


const helperImg = (filePath, size = 300, filename) => {
    return sharp(filePath)
    .resize(size)
    .toFile(`./optimize/${filename}`);
}


const storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req,file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`);
    }
})

const upload = multer({
    storage
});

const uploadImg = async (req) => {
    const {file} = req;
   await helperImg(req.file.path, 100, `resize-${req.file.filename}`)
    return req.file.filename;
};

module.exports = {
    upload,
    uploadImg
}