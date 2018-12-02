const express = require('express');
const app = express();
app.use(express.static(__dirname + "/public"));
const server = app.listen(1337);
const io = require('socket.io')(server);

var hash = {};
var maxcoord = 9;
var mincoord = 0;

io.on('connection', function (socket) {
    var thisid = socket.id;
    socket.emit('pushsocketid', {id: thisid });
    startingX = Math.floor(Math.random() * maxcoord);
    startingY = Math.floor(Math.random() * maxcoord);

    hash[thisid] = {'id': thisid, 'x': startingX, 'y': startingY};
    console.log("SERVER-SIDE: " + hash)
    io.emit('updategrid', {hash: hash });

    socket.on('playermove', function (data) {
        hash[thisid] = {'id': thisid, 'x': data.x, 'y': data.y};
        io.emit('updategrid', {hash: hash });
    });

    socket.on('disconnect', function () {
        delete hash[thisid];
    });
});




// socket.on('getsocketid', function () {
//     socket.emit('pushsocketid', {msg: "Socket ID is: " + socket.id });
// });

// socket.on('setbgtogreen', function () {
//     io.emit('setbgcolorgreen');
// });