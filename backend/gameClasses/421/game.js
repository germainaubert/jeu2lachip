const Dice = require('./dice.js')
const Players = require('./player.js')

class Game {
    constructor(users) {
        this.players = new Array()
        for (let i = 0; i < users.length; i++) {
            console.log(users[i].pseudo)
            this.players.push(new Players(users[i].pseudo))
        }
        this.gameIsOn = true
        this.dices = new Array()
        for (let i = 0; i < 3; i++) {
            this.dices.push(new Dice(i))
        }
        this.tokenPile = 21
        this.throwNotif = false
        this.vectors = null
        this.shufflePlayers()
    }
    // play() {
    //     while(this.gameIsOn) {

    //     }
    // }

    rollDices (localPlayer) {
        let result = new Array()
        for (let dice of this.dices) {
            result.push(dice.roll())
        }
        for (let player of this.players) {
            if (player.name === localPlayer) {
                player.roll++
                console.log("++ sur le lancer", player)
            }
        }
        
    }

    winCondition () {
        for (let player of this.players) {
            if (player.token === 0) {
                return true
            }
        }
        return false
    }

    shufflePlayers() {
        for (var i = this.players.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.players[i];
            this.players[i] = this.players[j];
            this.players[j] = temp;
        }
        this.players[0].thrower = true
    }

    export () {
        return {
            dices: this.dices,
            players: this.players,
            throwNotif: this.throwNotif,
            vectors: this.vectors,
        }
    }

}


module.exports = Game