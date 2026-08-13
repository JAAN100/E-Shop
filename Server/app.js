const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/Error");
const userRoute = require("./routes/user");
const shopRoute = require("./routes/shop");
const cors = require("cors");


const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", userRoute);

app.use("/api/shop", shopRoute);
// The error handler must be registered LAST, after every route.
// Express matches middleware in order — an error thrown in a route
// can only be caught by error handlers that come after it in the stack.
app.use(errorMiddleware);

module.exports = app;
