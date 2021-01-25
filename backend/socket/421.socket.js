const shareEvent = require('../middlewares/shareEvent')
const quatreVingt = require('../gameClasses/421/game.js')

class QuatreVingtSocket {
    constructor() {

    }

    socketOn(socket, lobbyContainer) {
        socket.on("init421", (idLobby) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt = new quatreVingt(targetLobby.users)
                shareEvent(socketList(targetLobby.users), 'initAll', targetLobby.quatreVingt.export())
        })
        socket.on("throwDices", (idLobby) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt.throwDice()
            shareEvent(socketList(targetLobby.users), 'throwDices', targetLobby.quatreVingt.export())
        })
        socket.on("result", (idLobby, result) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt.attributeResult(result)
            if (targetLobby.quatreVingt.getPlaying().roll >= 3) {
                targetLobby.quatreVingt.nextTurn()
                shareEvent(socketList(targetLobby.users), 'nextTurn', targetLobby.quatreVingt.export())
            } else {
                shareEvent(socketList(targetLobby.users), 'result', targetLobby.quatreVingt.export())
            }    
        })
        socket.on("resetPick", (idLobby) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt.resetPick()
            shareEvent(socketList(targetLobby.users), 'resetPick', targetLobby.quatreVingt.export())
        })
        socket.on("nextTurn", (idLobby) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt.nextTurn()
            shareEvent(socketList(targetLobby.users), 'nextTurn', targetLobby.quatreVingt.export())
        })
        socket.on("endPick", (idLobby) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            
            shareEvent(socketList(targetLobby.users), 'endPick', targetLobby.quatreVingt.export())
        })
        socket.on("lockedDice", (idLobby, locked) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt.locked = locked
        })
        socket.on("freeDice", (idLobby, idDice) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt.locked--
            shareEvent(socketList(targetLobby.users), 'freeDice', idDice)
        })
        socket.on("pickedDice", (idLobby, localPlayer) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            targetLobby.quatreVingt.quickReset = true
            for (let player of targetLobby.quatreVingt.players) {
                if (player.name === localPlayer) {
                    player.playPhase = "throw"
                }
            }
            shareEvent(socketList(targetLobby.users), 'update421', targetLobby.quatreVingt.export())
        })
        socket.on("glowingMesh", (idLobby, chosen) => {
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            if (targetLobby.quatreVingt.chosenValidity(chosen)) { // pas plus de 2 dé
                targetLobby.quatreVingt.chosen = chosen
                shareEvent(socketList(targetLobby.users), 'glowMesh', targetLobby.quatreVingt.export())
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