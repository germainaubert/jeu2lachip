const Dice = require('./dice.js')
const Players = require('./player.js')

class Game {
    constructor(users) {
        this.indexPlaying = 0
        this.players = new Array()
        for (let i = 0; i < users.length; i++) {
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
        this.results = null
        this.quickReset = null
        this.resetAll = false
        this.locked = 0
    }
    attributeResult(results) {
        this.getPlaying().result = results
    }

    resetPick() {
        this.chosen = null
    }

    nextTurn() {
        this.locked = 0
        this.getPlaying().roll = 0
        this.getPlaying().playPhase = false
        this.indexPlaying++
        if (this.indexPlaying === this.players.length) {
            this.winCondition()
            this.indexPlaying = 0
        }
        this.chosen = null
        this.players[this.indexPlaying].playPhase = true
        console.log(this.players)
    }

    throwDice() {
        this.chosen = null
        this.getPlaying().roll++
        this.randomVector()
    }

    winCondition() {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].result.sort()
            this.players[i].result.reverse()
            this.players[i].results = findResults(this.players[i].results, this.players[i].result)
        }
        if (this.players[0].results.points > this.players[1].results.points) {
            this.players[1].token += this.players[0].results.points
            this.tokenPile -= this.players[0].results.points
        } else if (this.players[0].results.points < this.players[1].results.points) {
            this.players[0].token += this.players[1].results.points
            this.tokenPile -= this.players[1].results.points
        } else if (this.players[0].results.score > this.players[1].results.points) {
            this.players[1].token += this.players[0].results.points
            this.tokenPile -= this.players[0].results.points
        } else if (this.players[0].results.score < this.players[1].results.points) {
            this.players[0].token += this.players[1].results.points
            this.tokenPile -= this.players[1].results.points
        }
    }

    shufflePlayers() {
        for (var i = this.players.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.players[i];
            this.players[i] = this.players[j];
            this.players[j] = temp;
        }
        this.players[0].playPhase = true
    }

    randomVector() {
        let results = []
        for (let i = 0; i < 3; i++) {
            results[i] = {
                x: Math.random() * 10,
                y: Math.random(),
                z: Math.random() * 10,
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

    chosenValidity(chosen) {
        let cpt = 0
        for (let i = 0; i < chosen.length; i++) {
            if (chosen[i]) {
                cpt++
            }
        }
        if (cpt > (2 - this.locked)) {
            return false
        } else {
            return true
        }
    }

    getPlaying() {
        return this.players.find(player => player.playPhase)
    }

    export() {
        return {
            dices: this.dices,
            players: this.players,
            throwNotif: this.throwNotif,
            vectors: this.vectors,
            chosen: this.chosen,
            results: this.results,
            quickReset: this.quickReset,
            resetAll: this.resetAll,
            locked: this.locked,
            tokenPile: this.tokenPile
        }
    }

}

function findResults(results, array) {
    results.score = checkScore(array)
    results.points = checkTriple(array)
    console.log("findResult", results, array)
    if (results.points) {
        return results
    }
    results.points = checkDoubleOne(array)
    if (results.points) {
        return results
    }
    results.points = checkSuite(array)
    if (results.points) {
        return results
    }
    results.points = check421(array)
    if (results.points) {
        return results
    }
    if (!results.points) {
        results.points = 1
        return results
    }
}
function checkTriple(array) {
    let count = 1
    for (let i = 0; i < array.length; i++) {
        if (array[i] == array[i - 1]) {
            count += 1
        }
    }
    if (count == 3) {
        console.log('triple', array[0])
        if (array[0] == 1) {
            return 7
        }
        else {
            return array[0]
        }
    }
}
function check421(array) {
    let tab = [4, 2, 1]
    if (array.join('') == tab.join('')) {
        console.log("421")
        return 8
    }
}
function checkDoubleOne(array) {
    let count = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i] == 1) {
            count += 1
        }
    }
    if (count == 2) {
        console.log('DOUBLE 1', array[0])
        return array[0]
    }
}
function checkTriple(array) {
    let count = 1
    for (let i = 0; i < array.length; i++) {
        if (array[i] == array[i - 1]) {
            count += 1
        }
    }
    if (count == 3) {
        console.log('triple', array[0])
        if (array[0] == 1) {
            return 7
        }
        else {
            return array[0]
        }
    }
}
function checkSuite(array) {
    let count = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i] == array[i - 1] - 1) {
            count += 1
        }
    }
    if (count == 2) {
        return 2
    }
}
function check421(array) {
    let tab = [4, 2, 1]
    if (array.join('') == tab.join('')) {
        console.log("421")
        return 8
    }
}
function checkScore(array) {
    return Number(array.join(''))
}

module.exports = Game