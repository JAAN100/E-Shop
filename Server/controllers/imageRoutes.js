const ErrorHandler = require("../utils/ErrorHandler");
const { uploadCloudinary } = require("../utils/cloudinary");

async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const uploadedImage = await uploadCloudinary(req.file.buffer, "mern-project");
    req.body.avatar = uploadedImage.url;
    req.body.avatarPublicId = uploadedImage.public_id;
    next();
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
}

async function uploadImages(req, res, next) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const uploadResults = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadCloudinary(file.buffer, "mern-project");
        return { url: result.url, public_id: result.public_id };
      }),
    );

    req.body.images = uploadResults;
    next();
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
}

async function uploadImagesForChat(req, res, next) {
  try {
    if (!req.files || req.files.length === 0) {
      return next();
    }

    const uploadResults = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadCloudinary(file.buffer, "mern-project");
        return { url: result.url, public_id: result.public_id };
      }),
    );

    req.body.images = uploadResults;
    next();
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
}

module.exports = { uploadImage, uploadImages, uploadImagesForChat };
