const express = require('express')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');

    // Réception d'un nouveau message
    socket.on('newmsg', function (msg) {
        console.log('msg', msg);
        date = new Date();
        msg.h = date.getHours();
        msg.m = date.getMinutes();
        console.log('newmsg', msg);
        io.emit('newmsg', msg);
    });

    // Déconnection
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('Listening on http://localhost:3000');
});