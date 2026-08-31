const cloudinary = require("cloudinary");
const fs = require("fs");

const uploadCloudinary = async (localFilePath, folder = "uploads") => {
    if (!localFilePath) {
        throw new Error("File path is required");
    }
    try {
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            folder,
            resource_type: "image"
        });

        fs.unlinkSync(localFilePath);
        return {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id
        };
    } catch (err) {
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        throw err;
    }
};

exports.uploadCloudinary = uploadCloudinary;
