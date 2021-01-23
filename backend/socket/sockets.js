const socketio = require('socket.io')
const config = require('../server.config')
const LobbySocket = require('./lobby.socket')
const ChasseSocket = require('./chasse.socket')
const PmuSocket = require('./pmu.socket')
const PurpleSocket = require('./purple.socket')

clients = []

module.exports = function (server, mySession) {
    
    const io = socketio(server)
    
    let lobby = new LobbySocket()
    let chasse = new ChasseSocket()
    let purple = new PurpleSocket()
    let pmu = new PmuSocket()
    io.on('connection', function (socket) {
        socket.use((packet, next) => {
            mySession(socket.request, {}, next)
        })
        clients.push(socket)
        lobby.socketOn(socket)
        chasse.socketOn(socket, lobby.lobbyContainer)
        pmu.socketOn(socket, lobby.lobbyContainer)
        purple.socketOn(socket, lobby.lobbyContainer)

    })

}