const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const { uploadCloudinary } = require("../utils/cloudinary");
const { log } = require("console");

async function uploadImage(req, res, next) {
  try {
    // multer's .single("image") puts the file on req.file (singular),
    // not req.files. req.files is only populated by .array()/.fields().
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
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

async function uploadImages(req, res, next) {
  try {
    // .array() puts files on req.files (plural array), not req.file
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const uploadResults = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadCloudinary(file.path, "mern-project");

        // temp file already lives on Cloudinary now — delete the local copy
        fs.unlink(file.path, (err) => {
          //if (err) console.error("Failed to remove temp upload:", file.path, err);
        });

        return { url: result.url, public_id: result.public_id };
      }),
    );

    // available in req.body.images inside createShop
    req.body.images = uploadResults;
    next();
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
}

module.exports = { uploadImage, uploadImages };
