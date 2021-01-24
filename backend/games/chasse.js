const Player = require("../gameClasses/chasse/player")

class Chasse {
    constructor (users) {
        this.users = users
        this.players = this.initPlayers()
    }

    initPlayers () {
        let players = []
        let x = 0
        let y = 1
        let z = 0
        for (let player of this.users) {
            players.push(new Player(player.pseudo, x, y, z))
            x += 3
        }
        return players
    }
}

module.exports = Chasse


