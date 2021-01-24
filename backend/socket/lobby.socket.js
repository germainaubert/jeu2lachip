const Lobby = require('../lobbyClasses/lobby')
const LobbyContainer = require('../lobbyClasses/lobbyContainer')
const shareEvent = require('../middlewares/shareEvent')

class LobbySocket {

    constructor() {
        this.lobbyContainer = new LobbyContainer()
    }

    socketOn(socket) {

        socket.on("createLobby", () => {
            let currentUser = socket.request.session.user
            currentUser.socket = socket
            let lobby = new Lobby()
            this.lobbyContainer.lobbies.push(lobby)
            let created = null // mettre false si probleme pendant création lobby
            if (!lobby.hasUser(currentUser)) {
                lobby.addUser(currentUser)
                lobby.hasJoin(currentUser)
                created = lobby.id
                // console.log(players)
            }
            socket.emit('validCreation', created)
        })
        socket.on("joinRandom", () => {
            let openLobby = lobbyContainer.lobbies.findIndex(lobby => lobby.is_full == false)
            if (openLobby >= 0) {
                if (!lobbyContainer.lobbies[openLobby].hasUser(currentUser)) {
                    lobbyContainer.lobbies[openLobby].addUser(currentUser)
                    //console.log(players)
                }
            }
        })
        socket.on("joinByCode", (idLobby) => {
            let currentUser = socket.request.session.user
            currentUser.socket = socket
            // console.log("sent by user ", idLobby)
            let codedLobby = this.lobbyContainer.lobbies.findIndex(lobby => lobby.id == idLobby)
            let validation = null
            if (codedLobby >= 0) {
                if (!this.lobbyContainer.lobbies[codedLobby].hasUser(currentUser)) {
                    this.lobbyContainer.lobbies[codedLobby].addUser(currentUser)
                    this.lobbyContainer.lobbies[codedLobby].hasJoin(currentUser)
                    //console.log(players)
                    validation = this.lobbyContainer.lobbies[codedLobby].id
                }
            }
            socket.emit('validJoin', validation)
            //console.log(" JE CRAQUE LISTE DES UTIILISTAEURS DU LOBBY : ",lobbyContainer.lobbies[codedLobby].users)
            // shareEvent(socketList(this.lobbyContainer.lobbies[codedLobby].users), 'playerList', socketNullifier(this.lobbyContainer.lobbies[codedLobby].users))
        })
        socket.on("notifyInitGame", (idLobby) => {
            let targetLobby = this.lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            shareEvent(socketList(targetLobby.users), 'startGame', null)
        })

        socket.on("initChat", (idLobby) => {
            // console.log(idLobby)
            let targetLobby = this.lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            shareEvent(socketList(targetLobby.users), 'initChat', targetLobby.chat)
        })
        socket.on("sendMessage", (data, idLobby) => {
            let currentUser = socket.request.session.user
            const message = { pseudo: currentUser.pseudo, message: data }
            let targetLobby = this.lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.addMessage(message)
            shareEvent(socketList(targetLobby.users), 'sendMessageEvent', targetLobby.chat)
        })

        socket.on('moveLeft', () => {
            let currentUser = socket.request.session.user
            currentPlayer = whichPlayer(players, currentUser)
            currentPlayer.x -= currentPlayer.speed
            shareEvent(clients, 'moveLeftEvent', players)
        });
        socket.on('moveUp', () => {
            let currentUser = socket.request.session.user
            currentPlayer = whichPlayer(players, currentUser)
            currentPlayer.y -= currentPlayer.speed
            shareEvent(clients, 'moveUpEvent', players)
        });
        socket.on('moveRight', () => {
            let currentUser = socket.request.session.user
            currentPlayer = whichPlayer(players, currentUser)
            currentPlayer.x += currentPlayer.speed
            shareEvent(clients, 'moveRightEvent', players)
        });
        socket.on("moveDown", () => {
            let currentUser = socket.request.session.user
            currentPlayer = whichPlayer(players, currentUser)
            currentPlayer.y += currentPlayer.speed
            shareEvent(clients, 'moveDownEvent', players)
        });

    }
}


function whichPlayer(players, player) {
    // console.log('which player', players, player)
    let found = players.find(elem => elem.id == player.id)
    return found
}

function socketList(users) {
    let sockets = []
    for (user of users) {
        sockets.push(user.socket)
    }
    return sockets
}

function socketNullifier(users) {
    let usersInfos = []

    for (user of users) {
        usersInfos.push(user.id, user.pseudo)
    }

    return usersInfos
}

module.exports = LobbySocket
