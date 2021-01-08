const shareEvent = require('../middlewares/shareEvent')
const Pmu = require('../gameClasses/pmu/game.js')
const Player = require('../gameClasses/pmu/player')
class PmuSocket {
    constructor() {

    }

    socketOn(socket, lobbyContainer) {
        socket.on("pmuInit", (idLobby) => {
            
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            
            targetLobby.pmu = new Pmu(createPlayers(targetLobby.users))
            
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

function createPlayers(users) {
    let players = []
    users.forEach(user => {
        players.push(new Player(user.pseudo))
    });
    return players
}

module.exports = PmuSocket