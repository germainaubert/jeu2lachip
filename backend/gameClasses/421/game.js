const Dice = require('./dice.js')
const Players = require('./player.js')

class Game {
    constructor(users) {
        this.indexPlaying = 0
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
        this.chosen = null
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

    nextTurn() {
        this.indexPlaying++
        if (this.indexPlaying === this.players.length) {
            this.indexPlaying = 0
        }
        
        this.players[this.indexPlaying].playPhase = "throw"
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
        this.players[0].playPhase = "throw"
    }

    randomVector() {
        let results = []
        for (let i = 0; i < 3; i++) {
            results[i] = {
                x: Math.random() * 2,
                y: Math.random() * 6,
                z: Math.random() * 2,
            }
            if (Math.random() < 0.5) {
                results[i].x = -results[i].x
            }
            if (Math.random() < 0.5) {
                results[i].z = -results[i].z
            }
        }
        this.vectors = results
    }

    export () {
        return {
            dices: this.dices,
            players: this.players,
            throwNotif: this.throwNotif,
            vectors: this.vectors,
            chosen: this.chosen
        }
    }

}


module.exports = Game