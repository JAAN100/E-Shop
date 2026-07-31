const app = require("./app");

// Handle Uncaught exception
process.on("uncaughtException" , (err)=>{
    console.log(`Error ${err.message}`);
    console.log("Shut Down the server for uncaught exception");
})


// Handle config .env
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"./config/.env"
    })
}


// Server

const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on http://localhost:` + process.env.PORT);
});


//unhandled promise rejection
process.on("unhandledRejection" , (err)=>{
    console.log("Promise Error " + err.message);

    server.close(()=>{
        process.exit(1);
    })
}) 
