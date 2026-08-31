if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}
const app = require("./app");
const connectDB = require("./db/connection");
const cloudinary = require("cloudinary");

// Handle Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log("Shut Down the server for uncaught exception");
});

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MONGO DB
connectDB();

// Server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:` + process.env.PORT);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log("Promise Error " + err.message);
  server.close(() => {
    process.exit(1);
  });
});
