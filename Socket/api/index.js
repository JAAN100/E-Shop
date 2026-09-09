const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const FRONT_URL = process.env.FRONT_URL || "https://hj-shop-elegant.vercel.app";

let server;
let io;

let users = [];
const messages = {};

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

const createMessage = (senderId, receiverId, text, images) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

const initializeServer = () => {
  const app = express();

  app.use(cors({
    origin: [FRONT_URL, "http://localhost:5173"],
    credentials: true,
  }));

  app.use(express.json({ limit: "4mb" }));

  app.get("/", (req, res) => {
    res.send("Socket Server running on Vercel — polling transport active");
  });

  server = http.createServer(app);

  io = socketIO(server, {
    cors: {
      origin: [FRONT_URL, "http://localhost:5173"],
      credentials: true,
    },
    transports: ["polling", "websocket"],
    allowUpgrades: true,
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
      const message = createMessage(senderId, receiverId, text, images);
      const user = getUser(receiverId);

      if (!messages[receiverId]) {
        messages[receiverId] = [message];
      } else {
        messages[receiverId].push(message);
      }

      if (user) {
        io.to(user.socketId).emit("getMessage", message);
      }
    });

    socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
      const user = getUser(senderId);
      if (messages[senderId]) {
        const message = messages[senderId].find(
          (msg) => msg.receiverId === receiverId && msg.id === messageId,
        );
        if (message) {
          message.seen = true;
          if (user) {
            io.to(user.socketId).emit("messageSeen", {
              senderId,
              messageId,
              receiverId,
              seen: true,
            });
          }
        }
      }
    });

    socket.on("updateLastMessage", ({ lastMessageId, lastMessage }) => {
      io.emit("getLastMessage", { lastMessageId, lastMessage });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};

module.exports = (req, res) => {
  if (!server) {
    initializeServer();
  }
  if (!server.listening) {
    server.listen(0, () => {
      console.log(`Socket server listening on port ${server.address().port}`);
    });
  }
  server.emit("request", req, res);
};
