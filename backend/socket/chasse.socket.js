const shareEvent = require('../middlewares/shareEvent')
const Chasse = require('../games/chasse.js')

class ChasseSocket {
    constructor() {

    }

    socketOn(socket, lobbyContainer) {
        socket.on("initChasse", (idLobby) => {
            
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.chasse = new Chasse(targetLobby.users)
            shareEvent(socketList(targetLobby.users), 'chasseInitiated', targetLobby.chasse.players)
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

module.exports = ChasseSocket