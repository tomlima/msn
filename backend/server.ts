import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users: Array<{
  id: string;
  name: string;
  description: string;
  avatar: string;
}> = [];

io.on("connection", (socket) => {
  console.log("new user connected");
  /*-------------------------------------
  User was disconnected 
  -----------------------------------------*/
  socket.on("disconnect", (reason) => {
    users = users.filter(function(user) {
      return user.id !== socket.id;
    });
    io.emit("get_all_users", users);
  });

  /*-------------------------------------
  Get all users
  -----------------------------------------*/
  socket.on("get_users", () => {
    io.emit("get_all_users", users);
  });

  /*-------------------------------------
  New user was connected
  -----------------------------------------*/
  socket.on("connect_user", (user) => {
    socket.data.userName = user.name;
    socket.data.userDesc = user.description;
    socket.data.userAvatar = user.avatar;

    users.push({
      id: socket.id,
      name: user.name,
      description: user.description,
      avatar: user.avatar,
    });

    io.emit("new_user_connected", {
      name: user.name,
      description: user.description,
      avatar: user.avatar,
    });
  });

  socket.on("message", (text) => {
    io.emit("receive_message", {
      text,
      authorId: socket.id,
      author: socket.data.userName,
    });
  });
});

server.listen(process.env.port || 3001, () => {
  console.log(`App running on port ${process.env.port || 3001}`);
});
