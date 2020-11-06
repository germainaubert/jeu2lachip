const socketio = require('socket.io')
const config = require('../server.config')
const Lobby = require('../lobby/lobby')
const lobby = new Lobby()
const Player = require('../lobby/player')


console.log(lobby)

players = []
clients = []

module.exports = function (server, mySession) {
    // io server
    const io = socketio(server)
    sharedsession = require("express-socket.io-session")
    io.use(sharedsession(mySession))

    io.on('connection', function (socket) {
        clients.push(socket)
        socket.on("logged", function (data) {
            if (!lobby.hasUser(data)) {
                lobby.addUser(data)
                players.push(new Player(data.id, data.pseudo, 0, 0, 20, 5, "#" + ((1 << 24) * Math.random() | 0).toString(16)))
            }
            shareEvent(clients, 'loggedEvent', { users: lobby.users, chat: lobby.chat, players: players })
            console.log(players)
        })
        

        socket.on("sendMessage", function (data) {
            lobby.addMessage(data)
            shareEvent(clients, 'sendMessageEvent', lobby.chat)
        })
        socket.on('moveLeft', function (player) {
            currentPlayer = whichPlayer(players, player)
            currentPlayer.x -= currentPlayer.speed
            shareEvent(clients, 'moveLeftEvent', players)
        });
        socket.on('moveUp', function (player) {
            currentPlayer = whichPlayer(players, player)
            currentPlayer.y -= currentPlayer.speed
            shareEvent(clients, 'moveUpEvent', players)
        });
        socket.on('moveRight', function (player) {
            currentPlayer = whichPlayer(players, player)
            currentPlayer.x += currentPlayer.speed
            shareEvent(clients, 'moveRightEvent', players)
        });
        socket.on("moveDown", function (player) {
            currentPlayer = whichPlayer(players, player)
            currentPlayer.y += currentPlayer.speed
            shareEvent(clients, 'moveDownEvent', players)
        });
        

    })

    function shareEvent(clients, eventName, datas) {
        clients.forEach((c) => {
            c.emit(eventName, datas)
        })
    }
    function whichPlayer(players, player) {
        console.log('which player', players, player)
        let found = players.find(elem => elem.id == player.currentUser.id)
        return found
    }


}