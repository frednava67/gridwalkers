// socket.on('setbgcolorpink', function () {
//     $("body").css('background-color', 'pink');
// });

// $("#greendiv").click(function(){
//     socket.emit('setbgtogreen');
// });

var socketid = "";
var selfx;
var selfy;

function resetGrid() {
    for (x=0;x<10;x++) {
        for (y=0;y<10;y++) {
            $("#div"+x+y).css('background','white');
        }
    }
}

function moveUp(){
    if(selfy < 9) {
        selfy++;
    }
    return {x: selfx, y: selfy};
}

function moveDown(){
    if(selfy > 0) {
        selfy--;
    }
    return {x: selfx, y: selfy};
}

function moveRight() {
    if(selfx < 9) {
        selfx++;
    }
    return {x: selfx, y: selfy};    
}

function moveLeft() {
    if(selfx > 0) {
        selfx--;
    }
    return {x: selfx, y: selfy};
}

$(document).ready(function (){
    var socket = io();

    socket.on('pushsocketid', function (data) {
        socketid = data.id;
        console.log("Assigned ID is: " + socketid);
    });

    socket.on('updategrid', function (data) {
        let idkeys  = Object.keys(data.hash)
        resetGrid();
        for (x=0;x< idkeys.length;x++) {
            if (data.hash[idkeys[x]].id == socketid) {
                selfx = data.hash[idkeys[x]].x;
                selfy = data.hash[idkeys[x]].y
                $("#div"+selfx+selfy).css('background','blue');
            } else {
                curx = data.hash[idkeys[x]].x;
                cury = data.hash[idkeys[x]].y
                $("#div"+curx+cury).css('background','gray');
            }
        }        
    });

    $("#moveup").click(function(){
        move = moveUp();
        socket.emit('playermove', move);
    });
    $("#movedown").click(function(){
        move = moveDown();
        socket.emit('playermove', move);
    });
    $("#moveright").click(function(){
        move = moveRight();
        socket.emit('playermove', move);
    });
    $("#moveleft").click(function(){
        move = moveLeft();
        socket.emit('playermove', move);
    });

    $("body").keyup(function (key) {
        switch(key.which) {
            case 38: //UP
                move = moveUp();
                socket.emit('playermove', move);
            break;

            case 39: //RIGHT
                move = moveRight();
                socket.emit('playermove', move);
            break;
            case 40: //DOWN
                move = moveDown();
                socket.emit('playermove', move);
            break;
            case 37: //LEFT
                move = moveLeft();
                socket.emit('playermove', move);
            break;
        }
    });

});
