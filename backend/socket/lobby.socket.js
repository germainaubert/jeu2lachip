const Lobby = require('../lobbyClasses/lobby')
const LobbyContainer = require('../lobbyClasses/lobbyContainer')
const lobbyContainer = new LobbyContainer()
const lobbyPlayer = require('../lobbyClasses/lobbyPlayer')
const shareEvent = require('../middlewares/shareEvent')

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
        // console.log("current user", currentUser)
        currentUser.socket = socket
        switch (command) {
            case "createLobby":
                let lobby = new Lobby()
                lobbyContainer.lobbies.push(lobby)
                let created = null // mettre false si probleme pendant création lobby
                if (!lobby.hasUser(currentUser)) {
                    lobby.addUser(currentUser)
                    let player = convertPlayer(currentUser)
                    lobby.players.push(player)
                    created = lobby.id
                    // console.log(players)
                }
                socket.emit('validCreation', created)
                console.log(lobby.users)
                break
            case "joinRandom":
                let openLobby = lobbyContainer.lobbies.findIndex(lobby => lobby.is_full == false) 
                if (openLobby >= 0) {
                    if (!lobbyContainer.lobbies[openLobby].hasUser(currentUser)) {
                        lobbyContainer.lobbies[openLobby].addUser(currentUser)
                        let player = convertPlayer(currentUser)
                        lobby.players.push(player)
                        console.log(players)
                    }
                }
                break
            case "joinByCode":
                //console.log("sent by user ",idLobby)
                let codedLobby = lobbyContainer.lobbies.findIndex(lobby => lobby.id == idLobby)
                let validation = null
                if(codedLobby >= 0) {
                    if (!lobbyContainer.lobbies[codedLobby].hasUser(currentUser)) {
                        lobbyContainer.lobbies[codedLobby].addUser(currentUser)
                        let player = convertPlayer(currentUser)
                        lobbyContainer.lobbies[codedLobby].players.push(player) 
                        //console.log(players)
                        validation = lobbyContainer.lobbies[codedLobby].id
                    }
                }
                socket.emit('validJoin', validation)
                console.log(" JE CRAQUE LISTE DES UTIILISTAEURS DU LOBBY : ",lobbyContainer.lobbies[codedLobby].users)
                shareEvent(socketList(lobbyContainer.lobbies[codedLobby].users), 'playerList', lobbyContainer.lobbies[codedLobby].players)
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

function socketList (users) {
    let sockets = []
    console.log(users)
    for (user of users) {
        sockets.push(user.socket)
    }
    console.log(' socket LISTE : ', sockets)
    return sockets
}

function socketNullifier (users) {
    let usersInfos = []
    
    for (user of users) {
        usersInfos.push(user.id, user.pseudo)
    }
    
    return usersInfos
}