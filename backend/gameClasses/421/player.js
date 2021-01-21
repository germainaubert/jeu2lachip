class Player {
    name
    constructor(name) {
        // console.log(name)
        this.name = name
        this.token = 0
        this.roll = 0
        this.thrower = false
        this.endTurn = false
    }
}

module.exports = Player