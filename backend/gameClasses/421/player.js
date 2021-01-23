class Player {
    name
    constructor(name) {
        // console.log(name)
        this.name = name
        this.token = 0
        this.roll = 0
        this.playPhase = false
        this.endTurn = false
    }
}

module.exports = Player