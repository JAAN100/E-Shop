const dotenv = require("dotenv");
dotenv.config();

require("../utils/cloudinary");

const app = require("../app");

module.exports = app;
