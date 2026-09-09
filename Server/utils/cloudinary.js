const dotenv = require("dotenv");
dotenv.config({
  path: require("path").join(__dirname, "..", "config", ".env"),
});

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

if (
  process.env.CLOUDINARY_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

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
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

exports.uploadCloudinary = uploadCloudinary;
exports.cloudinary = cloudinary;
