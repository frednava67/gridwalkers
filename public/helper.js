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
        if(selfy < 9) {
            selfy++;
        }
        move = {x: selfx, y: selfy};
        socket.emit('playermove', move);
    });
    $("#movedown").click(function(){
        if(selfy > 0) {
            selfy--;
        }
        move = {x: selfx, y: selfy};
        socket.emit('playermove', move);
    });
    $("#moveright").click(function(){
        if(selfx < 9) {
            selfx++;
        }
        move = {x: selfx, y: selfy};
        socket.emit('playermove', move);
    });
    $("#moveleft").click(function(){
        if(selfx > 0) {
            selfx--;
        }
        move = {x: selfx, y: selfy};
        socket.emit('playermove', move);
    });



});
