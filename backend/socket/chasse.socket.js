const shareEvent = require('../middlewares/shareEvent')
const Chasse = require('../games/chasse.js')

class ChasseSocket {
    constructor() {
        
    }

    socketOn(socket, lobbyContainer) {
        socket.on("initChasse", (idLobby) => {
            console.log("Starting chasse à la chip, Lobby n°", idLobby)
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.chasse = new Chasse(targetLobby.users)
            let targetLobbyUsers = targetLobby.users
            let targetLobbyChassePlayers = targetLobby.chasse.players
            shareEvent(socketList(targetLobbyUsers), 'chasseInitiated', targetLobbyChassePlayers)
            setInterval(() => chasseUpdate(targetLobbyUsers, targetLobbyChassePlayers), 30)
        })
        
        socket.on("updatePlayer", (localPlayer, idLobby) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id === idLobby)
            let targetPlayer = targetLobby.chasse.players.find(player => player.name === localPlayer.pseudo)
            targetPlayer.coords = localPlayer.coords
        })

    }

}

function chasseUpdate (targetLobbyUsers, targetLobbyChassePlayers) {
    shareEvent(socketList(targetLobbyUsers), 'chasseUpdate', targetLobbyChassePlayers)
}

function socketList(users) {
    let sockets = []
    for (user of users) {
        sockets.push(user.socket)
    }
    return sockets
}

module.exports = ChasseSocket