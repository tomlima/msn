import express from "express";
import http from "http";
import { Server } from "socket.io";
import User from '../Domain/User'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users: Array<User> = [];

io.on("connection", (socket) => {
  /*-------------------------------------
  User was disconnected 
  -----------------------------------------*/
  socket.on("disconnect", (reason: string) => {
    users = users.filter(function(user) {
      return user.Id !== socket.id;
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
    users.push(user);
    const userObj = new User(socket.id, user.name,user.description,user.avatar,user.status);
    io.emit("new_user_connected", userObj);
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
