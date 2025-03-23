require('dotenv').config();
const multer = require('multer'); // multer for file upload
const cloudinary = require('cloudinary').v2; // cloudinary
const fs = require('fs'); // fs for file management
const upload = multer({ dest: 'uploads/' }); // multer config
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

const uploadImageMiddleware = async (req, res, next) => { 
    try {
        console.log(req.body);
        /// Check if the file is empty
        if (!req.file) {
            return res.status(400).json({ message: "File is empty" });
        }
        const result = await cloudinary.uploader.upload(req.file.path ,{
            folder: "storage_File"
        }); // upload image to cloudinary

        req.imagesUrl = result.secure_url; // save image url to req
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }finally{
        fs.unlinkSync(req.file.path) // delete file in uploads folder
    }
    next();
}
module.exports = { upload, uploadImageMiddleware };