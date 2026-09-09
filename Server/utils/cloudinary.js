const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const uploadCloudinary = async (fileBuffer, folder = "uploads") => {
    if (!fileBuffer) {
        throw new Error("File buffer is required");
    }

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
            },
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id,
                    });
                }
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

exports.uploadCloudinary = uploadCloudinary;
