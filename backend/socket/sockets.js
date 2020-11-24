const socketio = require('socket.io')
const config = require('../server.config')
const lobby = require('./lobby.socket')
clients = []

module.exports = function (server, mySession) {
    const io = socketio(server)

    io.on('connection', function (socket) {
        socket.use((packet, next) => {
            mySession(socket.request, {}, next)
        })
        clients.push(socket)
        lobby(socket)


    })

}