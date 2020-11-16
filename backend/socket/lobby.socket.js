const Lobby = require('../lobbyClasses/lobby')
const LobbyContainer = require('../lobbyClasses/lobbyContainer')
const lobbyContainer = new LobbyContainer()
const lobbyPlayer = require('../lobbyClasses/lobbyPlayer')
const shareEvent = require('../middlewares/shareEvent')

let players = []

module.exports = function (socket) {

    socket.on("createLobby", function () {

        console.log(lobbyContainer.lobbies)


        console.log(lobbyContainer.lobbies)
    })

    socket.on("searchLobby", function (data) {
        console.log(data)
        let found = lobbyContainer.lobbies.find(lobby => lobby.id == data)
        console.log(found)
    })

    socket.on("login", function (command, idLobby) {

        let currentUser = socket.request.session.user
        console.log("je suis un ", currentUser, " putain de héros")
        currentUser.socket = socket
        switch (command) {
            case "createLobby":
                let lobby = new Lobby()
                lobbyContainer.lobbies.push(lobby)
                if (!lobby.hasUser(currentUser)) {
                    lobby.addUser(currentUser)
                    let player = convertPlayer(currentUser)
                    players.push(player)
                    console.log(players)
                }
                console.log(lobby)
                break
            case "joinRandom":
                let openLobby = lobbyContainer.lobbies.findIndex(lobby => lobby.is_full == false) 
                if (openLobby >= 0) {
                    if (!lobbyContainer.lobbies[openLobby].hasUser(currentUser)) {
                        lobbyContainer.lobbies[openLobby].addUser(currentUser)
                        let player = convertPlayer(currentUser)
                        players.push(player)
                        console.log(players)
                    }
                }
                break
            case "joinByCode":
                let codedLobby = lobbyContainer.lobbies.findIndex(lobby => lobby.id == idLobby)
                if(codedLobby >= 0) {
                    if (!lobbyContainer.lobbies[codedLobby].hasUser(currentUser)) {
                        lobbyContainer.lobbies[codedLobby].addUser(currentUser)
                        let player = convertPlayer(currentUser)
                        players.push(player)
                        console.log(players)
                    }
                }
                break

        }
        console.log(lobbyContainer.lobbies)
    })


    socket.on("sendMessage", function (data) {
        let currentUser = socket.request.session.user
        const message = { pseudo: currentUser.pseudo, content: data }
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