const dotenv = require("dotenv");
dotenv.config({
  path: require("path").join(__dirname, "..", "config", ".env"),
});

require("../utils/cloudinary");

const app = require("../app");

module.exports = app;
