const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const sharp = require('sharp');


/*const helperImg = (filePath, size = 300, filename) => {
    return sharp(filePath)
    .resize(size)
    .toFile(`./optimize/${filename}`);
}
*/

const storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req,file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`);
    }
})

const spacesEndpoint = new aws.Endpoint(process.env.S3_ENDPOINT);

const s3 = new aws.S3({
    endpoint: spacesEndpoint
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.BUCKET_NAME,
        acl: 'public-read',
        metadata: (req,file,cb) => {
            console.log("metadata");
            cb(null, {
                fieldname: file.fieldname
            });
        },
        key: (req,file,cb) => {

            console.log(file);
            console.log(req.file)
            
            cb(null, file.originalname);
        }
    })    
}).single('file');



/*const uploadImg = async (req) => {
    const {file} = req;
   await helperImg(req.file.path, 100, `resize-${req.file.filename}`)
    return req.file.filename;
};*/

module.exports = {
    s3,
    upload
  //  uploadImg
}