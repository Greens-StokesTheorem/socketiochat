const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const port = 8080;
const fs = require("fs");
const { Socket } = require('dgram');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



let position = {x: 0.5, y: 0.5};
if (fs.existsSync("data.json")) {
    position = JSON.parse(fs.readFileSync("data.json", "utf8"));
    console.log("readfile")
}



io.on('connection', (socket) => {


    console.log("connected")

    io.emit("update position", position);


    socket.on("drag", (newPosition) => {

        position = newPosition;
        fs.writeFileSync("data.json", JSON.stringify(position));
        io.emit("update position", position)

    })

    // socket.on('send name', (username) => {
    //     io.emit('send name', (username));
    //     console.log(username);

    // });

    // socket.on('send message', (chat) => {
    //     io.emit('send message', (chat));
    //     console.log(chat);
    // });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});



server.listen(port, () => {
    console.log(`Server is listening at the port: ${port}`);
});
