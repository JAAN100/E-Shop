const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World From socket Server!");
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (reciverId) => {
  return users.find((user) => user.userId === reciverId);
};

// Define message for seen property
const createMessage = (senderId, reciverId, text, images) => ({
  senderId,
  reciverId,
  text,
  images,
  seen: false,
});

io.on("connection", (socket) => {
  console.log("A user is connected");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  const messages = {}; // For Tracking messages sent to each user
  socket.on("sendMessage", ({ senderId, reciverId, text, images }) => {
    const message = createMessage(senderId, reciverId, text, images);
    const user = getUser(reciverId);

    //Store the messages in the messages object
    if (!messages[reciverId]) {
      messages[reciverId] = [message];
    } else {
      messages[reciverId].push(message);
    }

    //send message to the receiver if they are connected
    io.to(user?.socketId).emit("getMessage", message);
  });

  socket.on("messageSeen", ({ senderId, reciverId, messageId }) => {
    const user = getUser(senderId);

    //update the seen flag
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (msg) => msg.reciverId === reciverId && msg.id === messageId,
      );
      if (message) {
        message.seen = true;
        //send the seen status to the sender
        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          messageId,
          reciverId,
          seen: true,
        });
      }
    }
  });
  // update and get last send message
  socket.on("updateLastMessage", ({ lastMessageId, lastMessage }) => {
    io.emit("getLastMessage", { lastMessageId, lastMessage });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("A user is disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});
