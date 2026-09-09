if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

require("./utils/cloudinary");

const app = require("./app");
const connectDB = require("./db/connection");

process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log("Shut Down the server for uncaught exception");
});

connectDB()
  .then(() => {
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:` + process.env.PORT);
    });

    process.on("unhandledRejection", (err) => {
      console.log("Promise Error " + err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB on startup:", err.message);
    process.exit(1);
  });
