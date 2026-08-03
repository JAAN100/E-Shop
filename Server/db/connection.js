const mongoose = require("mongoose");

const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("mongodb connected with server");
    });
}   

module.exports = connectDB;