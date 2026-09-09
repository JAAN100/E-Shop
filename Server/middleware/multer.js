const multer = require("multer");
const imageFileFilter = require("../utils/multerFileFilter");

const storage = multer.memoryStorage();

const uploadImageMulter = multer({
    storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 1024 * 1024 * 4
    }
});

module.exports = {
    uploadImageMulter
};
