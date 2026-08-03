const ErrorHandler = require("../utils/ErrorHandler");
const { uploadCloudinary } = require("../utils/cloudinary");

async function uploadImage(req, res, next) {
    try {
        // multer's .single("image") puts the file on req.file (singular),
        // not req.files. req.files is only populated by .array()/.fields().
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const uploadedImage = await uploadCloudinary(req.file.path, "mern-project");

        // Attach the result to req.body so createUser can save it on the user doc.
        req.body.avatar = uploadedImage.url;
        req.body.avatarPublicId = uploadedImage.public_id;
        next(); // Call the next middleware (createUser) to continue processing the request.
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

module.exports = uploadImage;
