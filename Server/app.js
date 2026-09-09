const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/Error");
const userRoute = require("./routes/user");
const shopRoute = require("./routes/shop");
const productRoute = require("./routes/product");
const eventRoute = require("./routes/event");
const coupounCodeRoute = require("./routes/coupounCode");
const paymentRoute = require("./routes/payment");
const orderRoute = require("./routes/order");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/messages");
const cors = require("cors");
const app = express();
const FRONT_URL = process.env.FRONT_URL || "http://localhost:5173";
app.use(cors({ origin: FRONT_URL, credentials: true }));
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true, limit: "4mb" }));
app.use(cookieParser());

const connectDB = require("./db/connection");
let dbInitializing = null;
let dbReady = false;

app.use((req, res, next) => {
  if (dbReady) return next();
  if (dbInitializing) {
    dbInitializing.then(() => next()).catch((err) => next(err));
    return;
  }
  dbInitializing = connectDB()
    .then(() => {
      dbReady = true;
      dbInitializing = null;
      console.log("✅ MongoDB connected");
      next();
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err.message);
      dbInitializing = null;
      res.status(500).json({
        success: false,
        message: "Database connection failed — check MONGO_URI in env vars",
      });
    });
});

app.use("/api/user", userRoute);

app.use("/api/shop", shopRoute);

app.use("/api/product", productRoute);

app.use("/api/event", eventRoute);

app.use("/api/coupoun-code", coupounCodeRoute);

app.use("/api/payment", paymentRoute);

app.use("/api/order", orderRoute);

app.use("/api/conversation", conversationRoute);

app.use("/api/message", messageRoute);

app.use(errorMiddleware);

module.exports = app;
