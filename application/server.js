"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var User_1 = require("../Domain/User");
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
var users = [];
io.on("connection", function (socket) {
    /*-------------------------------------
    User was disconnected
    -----------------------------------------*/
    socket.on("disconnect", function (reason) {
        users = users.filter(function (user) {
            return user.Id !== socket.id;
        });
        io.emit("get_all_users", users);
    });
    /*-------------------------------------
    Get all users
    -----------------------------------------*/
    socket.on("get_users", function () {
        io.emit("get_all_users", users);
    });
    /*-------------------------------------
    New user was connected
    -----------------------------------------*/
    socket.on("connect_user", function (user) {
        users.push(user);
        var userObj = new User_1.default(socket.id, user.name, user.description, user.avatar, user.status);
        io.emit("new_user_connected", userObj);
    });
    socket.on("message", function (text) {
        io.emit("receive_message", {
            text: text,
            authorId: socket.id,
            author: socket.data.userName,
        });
    });
});
server.listen(process.env.port || 3001, function () {
    console.log("App running on port ".concat(process.env.port || 3001));
});
