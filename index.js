const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const port = 8080;
const fs = require("fs");

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});






io.on('connection', (socket) => {


    console.log("connected")

    socket.on("pointer move", (position) => {

        const pointerposition = position;

        io.emit("pointer move", pointerposition);

    })


    socket.on('send name', (username) => {
        io.emit('send name', (username));
        console.log(username);

    });

    socket.on('send message', (chat) => {
        io.emit('send message', (chat));
        console.log(chat);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});



server.listen(port, () => {
    console.log(`Server is listening at the port: ${port}`);
});
