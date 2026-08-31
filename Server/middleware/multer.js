const fs = require("fs");
const path = require("path");
const multer = require("multer");
const imageFileFilter = require("../utils/multerFileFilter");

// Multer's diskStorage does NOT create the destination folder for you —
// if "uploads/" doesn't exist on disk, every upload fails with ENOENT.
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const uploadImageMulter = multer({
    storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
});

module.exports = {
    uploadImageMulter
};
