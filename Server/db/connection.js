const mongoose = require("mongoose");

mongoose.set("returnDocument", "after");

const connectDB = () => {
    if (mongoose.connection.readyState >= 1) {
        return Promise.resolve();
    }
    return mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
    }).then(() => {
        console.log("mongodb connected with server");
    }).catch((err) => {
        console.error("MongoDB connection error:", err.message);
        throw err;
    });
}

module.exports = connectDB;
