class Player {
    name
    bet
    hp
    horse
    constructor(name, skin) {
        this.name = name
        this.bet = 0
        this.horse = null
        this.bullets = 0
        this.hp = 20
        this.arrived = false
        this.skin = skin
    }
}

module.exports = Player