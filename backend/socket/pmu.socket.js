const shareEvent = require('../middlewares/shareEvent')
const Pmu = require('../gameClasses/chasse.js')

class PmuSocket {
    constructor() {

    }

    socketOn(socket, lobbyContainer) {
        socket.on("pmuInit", (idLobby) => {
            
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.pmu = new Pmu(targetLobby.users)
            shareEvent(socketList(targetLobby.users), 'pmuInitiated', targetLobby.pmu.players)
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

module.exports = PmuSocket