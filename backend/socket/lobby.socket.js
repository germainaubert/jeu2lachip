const Lobby = require('../lobbyClasses/lobby')
const lobby = new Lobby()
const lobbyPlayer = require('../lobbyClasses/lobbyPlayer')
const shareEvent = require('../middlewares/shareEvent') 

let players = [] 

module.exports = function (socket) {
    
    socket.on("logged", function () {
        let currentUser = socket.request.session.user
        console.log("je suis un ", currentUser, " putain de héros")
        if(!lobby.hasUser(currentUser)) {
            lobby.addUser(currentUser)
            let player = convertPlayer(currentUser)
            players.push(player)
        }
        console.log(lobby)
        console.log(players)
        console.log("cul")
        shareEvent(clients, 'loggedEvent', {lobby, players})
    })


    socket.on("sendMessage", function (data) {
        let currentUser = socket.request.session.user
        const message = {pseudo : currentUser.pseudo, content: data}
        lobby.addMessage(message)
        shareEvent(clients, 'sendMessageEvent', lobby.chat)
    })

    socket.on('moveLeft', function () {
        let currentUser = socket.request.session.user
        currentPlayer = whichPlayer(players, currentUser)
        currentPlayer.x -= currentPlayer.speed
        shareEvent(clients, 'moveLeftEvent', players)
    });
    socket.on('moveUp', function () {
        let currentUser = socket.request.session.user
        currentPlayer = whichPlayer(players, currentUser)
        currentPlayer.y -= currentPlayer.speed
        shareEvent(clients, 'moveUpEvent', players)
    });
    socket.on('moveRight', function () {
        let currentUser = socket.request.session.user
        currentPlayer = whichPlayer(players, currentUser)
        currentPlayer.x += currentPlayer.speed
        shareEvent(clients, 'moveRightEvent', players)
    });
    socket.on("moveDown", function () {
        let currentUser = socket.request.session.user
        currentPlayer = whichPlayer(players, currentUser)
        currentPlayer.y += currentPlayer.speed
        shareEvent(clients, 'moveDownEvent', players)
    });
}

function convertPlayer(user) {
    let player = new lobbyPlayer(user.id, user.pseudo, 0, 0, 20, 5)
    return player
}

function whichPlayer(players, player) {
    console.log('which player', players, player)
    let found = players.find(elem => elem.id == player.id)
    return found
}