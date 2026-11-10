const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const players = {};

io.on("connection", (socket) => {
    console.log("接続:", socket.id);

    players[socket.id] = {
        x: 100,
        y: 100
    };

    io.emit("players", players);

    socket.on("move", (pos) => {
        players[socket.id] = pos;
        io.emit("players", players);
    });

    socket.on("disconnect", () => {
        delete players[socket.id];
        io.emit("players", players);
    });
});

server.listen(3000, () => {
    console.log("http://localhost:3000");
});