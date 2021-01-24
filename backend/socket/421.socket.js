const shareEvent = require('../middlewares/shareEvent')
const quatreVingt = require('../gameClasses/421/game.js')

class QuatreVingtSocket {
    constructor() {

    }

    socketOn(socket, lobbyContainer) {
        socket.on("init421", (idLobby) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt = new quatreVingt(targetLobby.users)
            setTimeout(() => {
                shareEvent(socketList(targetLobby.users), 'update421', targetLobby.quatreVingt.export())
            },
                500
            )

        })
        socket.on("throwDices", (idLobby, localPlayer) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt.resetAll = false
            targetLobby.quatreVingt.quickReset = false
            for (let player of targetLobby.quatreVingt.players) {
                if (player.name === localPlayer) {
                    player.roll++
                    targetLobby.quatreVingt.randomVector()
                    player.playPhase = "throw"
                    targetLobby.quatreVingt.throwNotif = true
                }
            }
            
            shareEvent(socketList(targetLobby.users), 'update421', targetLobby.quatreVingt.export())
        })

        socket.on("diceResult", (idLobby, results, localPlayer) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt.throwNotif = false
            targetLobby.quatreVingt.results = results
            for (let player of targetLobby.quatreVingt.players) {
                if (player.name === localPlayer) {
                    if (targetLobby.quatreVingt.chosen !== null) {
                        if (lockedDiceCpt(targetLobby.quatreVingt.chosen) >= 2) {
                            player.playPhase = "throw"
                            targetLobby.quatreVingt.chosen = null
                        }
                    } else {
                        player.playPhase = "pick"
                        targetLobby.quatreVingt.chosen = null
                    }
                }
                if (player.roll === 3 && player.name === localPlayer) {
                    targetLobby.quatreVingt.throwNotif = false
                    player.playPhase = false
                    player.roll = 0
                    targetLobby.quatreVingt.nextTurn()
                }

            }
            console.log("diceresult", targetLobby.quatreVingt)
            setTimeout(() => {
                shareEvent(socketList(targetLobby.users), 'update421', targetLobby.quatreVingt.export())
            }, 4000)
            
        })

        socket.on("pickedDice", (idLobby, localPlayer) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt.quickReset = true

            shareEvent(socketList(targetLobby.users), 'update421', targetLobby.quatreVingt.export())
        })
        socket.on("glowingMesh", (idLobby, chosen) => {

            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            if (targetLobby.quatreVingt.chosenValidity(chosen)) {
                targetLobby.quatreVingt.chosen = chosen
                shareEvent(socketList(targetLobby.users), 'update421', targetLobby.quatreVingt.export())
            }

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

function lockedDiceCpt(chosen) {
    let cpt = 0
    for (let i = 0; i < chosen.length; i++) {
        if (chosen[i]) {
            cpt++
        }
    }
    return cpt
}

module.exports = QuatreVingtSocket