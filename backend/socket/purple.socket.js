const shareEvent = require('../middlewares/shareEvent')
const Purple = require('../gameClasses/purple/game.js')
const Player = require('../gameClasses/purple/player')
class PurpleSocket {
    constructor() {

    }

    socketOn(socket, lobbyContainer) {
        socket.on("purpleInit", (idLobby) => {
            console.log("truc")
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            
            targetLobby.purple = new Purple(createPlayers(targetLobby.users))
            console.log('game play')
            
            shareEvent(socketList(targetLobby.users), 'purpleInitiated', targetLobby.purple)
        })
        socket.on("purplePlay", (idLobby) => {
            
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            
            targetLobby.purple.play()
            console.log('game play')
            
            shareEvent(socketList(targetLobby.users), 'purplePlayed', targetLobby.purple)
        })
    }

}

function socketList(users) {
    let sockets = []
    for (user of users) {
        sockets.push(user.socket)
    }
    return sockets
}

function createPlayers(users) {
    let players = []
    users.forEach(user => {
        players.push(new Player(user.pseudo, user.skin))
    });
    return players
}

module.exports = PurpleSocket