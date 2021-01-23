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
                500
            )
            
        })
        socket.on("throwDices", (idLobby, localPlayer) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            for (let player of targetLobby.quatreVingt.players) {
                if (player.name === localPlayer) {
                    player.roll++
                    if(player.roll === 3) {
                        targetLobby.quatreVingt.throwNotif = false
                        console.log("trop de lancer ahah")
                        player.playPhase = false
                        player.roll = 0
                        targetLobby.quatreVingt.nextTurn()
                    } else {
                        console.log("cool rahoul je shoot")
                        targetLobby.quatreVingt.randomVector()
                        targetLobby.quatreVingt.throwNotif = true
                    }
                }
            }
            
            shareEvent(socketList(targetLobby.users), 'update421', targetLobby.quatreVingt.export())
        })
        socket.on("glowingMesh", (idLobby, chosen) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt.chosen = chosen
            shareEvent(socketList(targetLobby.users), 'update421', targetLobby.quatreVingt.export())
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