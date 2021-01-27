const shareEvent = require('../middlewares/shareEvent')
const Purple = require('../gameClasses/purple/game.js')
const Player = require('../gameClasses/purple/player')

class PurpleSocket {
    constructor() {

    }

    socketOn(socket, lobbyContainer) {

        socket.on("purpleInit", (idLobby, leftPlayers) => {
            console.log("hello puirple !")
            let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)
            let playerValid = [leftPlayers[0], leftPlayers[1], leftPlayers[2]]
            let usersValid = []
            playerValid.forEach(player => {
                let found = targetLobby.users.find(user => user.pseudo === player.name)

                usersValid.push(found)

            });
            targetLobby.purple = new Purple(createPlayers(usersValid))
            targetLobby.purple.currentPlayer = targetLobby.purple.players[0]

            shareEvent(socketList(targetLobby.users), 'purpleInitiated', targetLobby.purple)

        })
    socket.on("purplePlayTurn", (idLobby, answer) => {

        let targetLobby = lobbyContainer.lobbies.find(lobby => lobby.id == idLobby)


        targetLobby.purple.checkAnswer(answer)
        targetLobby.purple.checkDeadPlayers()
        targetLobby.purple.checkStateOfQuestions()
        targetLobby.purple.turns += 1
        console.log('game play')
        console.log("les joueurs", targetLobby.purple)
        
        if (!targetLobby.purple.playerAlive) {

            shareEvent(socketList(targetLobby.users), 'purpleEnd', targetLobby.purple)
        } else {
            shareEvent(socketList(targetLobby.users), 'purplePlayTurn', targetLobby.purple)
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

function createPlayers(users) {
    let players = []
    users.forEach(user => {
        players.push(new Player(user.pseudo, user.skin))
    });
    return players
}

module.exports = PurpleSocket