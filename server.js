const express = require('express');
const app = express();
app.use(express.static(__dirname + "/public"));
const server = app.listen(1337);
const io = require('socket.io')(server);

var hash = {};
var maxcoord = 9;
var mincoord = 0;

// initialize mobs
hash[0] = {'id': 0, 'x': 1, 'y': 1, 'type': -1}; // orc
hash[1] = {'id': 1, 'x': 1, 'y': 8, 'type': -2}; // goblin
hash[2] = {'id': 2, 'x': 8, 'y': 1, 'type': -3}; // ogre

function calcMobMove(mob) {
    dir = Math.floor(Math.random() * 4);

    switch(dir) {
        case 0: //UP
        if(mob.y < 9) {
            mob.y++;
        }
        break;
        case 1: // DOWN
        if(mob.y > 0) {
            mob.y--;
        }        
        break;
        case 2: // RIGHT
        if(mob.x < 9) {
            mob.x++;
        }  
        break;
        case 3: // LEFT
        if(mob.x > 0) {
            mob.x--;
        }  
        break;
    }

}

io.on('connection', function (socket) {
    var thisid = socket.id;
    socket.emit('pushsocketid', {id: thisid });
    startingX = Math.floor(Math.random() * maxcoord);
    startingY = Math.floor(Math.random() * maxcoord);

    hash[thisid] = {'id': thisid, 'x': startingX, 'y': startingY, 'type': 1};
    console.log("SERVER-SIDE: " + hash)
    io.emit('updategrid', {hash: hash });

    socket.on('playermove', function (data) {
        calcMobMove(hash[0]);
        calcMobMove(hash[1]);
        calcMobMove(hash[2]);
        hash[thisid] = {'id': thisid, 'x': data.x, 'y': data.y, 'type': 1};
        io.emit('updategrid', {hash: hash });
    });

    socket.on('disconnect', function () {
        delete hash[thisid];
    });
});


