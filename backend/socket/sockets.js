const socketio = require('socket.io')
const config = require('../server.config')
const LobbySocket = require('./lobby.socket')
const ChasseSocket = require('./chasse.socket')

clients = []

module.exports = function (server, mySession) {
    
    const io = socketio(server)
    
    let lobby = new LobbySocket()
    let chasse = new ChasseSocket()
    io.on('connection', function (socket) {
        socket.use((packet, next) => {
            mySession(socket.request, {}, next)
        })
        clients.push(socket)
        lobby.socketOn(socket)
        chasse.socketOn(socket, lobby.lobbyContainer)

    })

}