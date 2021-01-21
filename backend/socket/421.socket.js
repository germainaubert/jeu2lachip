const shareEvent = require('../middlewares/shareEvent')
const quatreVingt = require('../gameClasses/421/game.js')

class QuatreVingtSocket {
    constructor() {
        
    }

    socketOn(socket, lobbyContainer) {
        socket.on("init421", (idLobby) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt = new quatreVingt(targetLobby.users)
            console.log("init")
            setTimeout(() => {
                    shareEvent(socketList(targetLobby.users), 'update421', targetLobby.quatreVingt.export())
                },
                2000
            )
            
        })
        socket.on("throwDices", (idLobby, player) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt.throwNotif = true
            shareEvent(socketList(targetLobby.users), 'update421', targetLobby.quatreVingt.export())
        })
        socket.on('diceVector', (idLobby, vectors) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt.vectors = vectors
            shareEvent(socketList(targetLobby.users), 'throwDice', targetLobby.quatreVingt.vectors)
        })
    }

    // socketOn(socket, lobbyContainer) {
    //     socket.on("initChasse", (idLobby) => {
    //         console.log("Starting chasse à la chip, Lobby n°", idLobby)
    //         let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
    //         targetLobby.chasse = new Chasse(targetLobby.users)
    //         targetLobby.chasse.init = false
    //         let targetLobbyUsers = targetLobby.users
    //         let targetLobbyChassePlayers = targetLobby.chasse.players
    //         shareEvent(socketList(targetLobbyUsers), 'chasseInitiated', targetLobbyChassePlayers)
            
    //     })
        
    //     socket.on("updatePlayer", (localPlayer, idLobby) => {
    //         let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id === idLobby)
    //         let targetLobbyUsers = targetLobby.users
    //         let targetLobbyChassePlayers = targetLobby.chasse.players
    //         if (!targetLobby.chasse.init) {
    //             targetLobby.chasse.init = setInterval(function () { chasseUpdate(targetLobbyUsers, targetLobbyChassePlayers) }, 30)
    //         }
            
    //         let targetPlayer = targetLobby.chasse.players.find(player => player.name === localPlayer.pseudo)
    //         targetPlayer.coords = localPlayer.coords
            
    //     })
        
    // }

}

// function chasseUpdate (targetLobbyUsers, targetLobbyChassePlayers) {
//     shareEvent(socketList(targetLobbyUsers), 'chasseUpdate', targetLobbyChassePlayers)
// }

function socketList(users) {
    let sockets = []
    for (user of users) {
        sockets.push(user.socket)
    }
    return sockets
}

module.exports = QuatreVingtSocket