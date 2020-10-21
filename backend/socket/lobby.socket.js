const socketio = require('socket.io');

module.exports = function (server) {
    // io server
    const io = socketio(server);

    // game state (players list)
    const players = {};

    io.on('connection', function (socket) {
        // register new player
        players[socket.id] = {
            x: 0,
            y: 0,
            size: 20,
            speed: 5,
            c: "#" + ((1 << 24) * Math.random() | 0).toString(16)
        };

        // delete disconnected player
        socket.on('disconnect', function () {
            delete players[socket.id];
        });

    io.on('displayTest', function () {
        console.log(players)
    })
    });
};