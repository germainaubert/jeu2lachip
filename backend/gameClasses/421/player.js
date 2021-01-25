class Player {
    name
    constructor(name) {
        // console.log(name)
        this.name = name
        this.token = 0
        this.roll = 0
        this.playPhase = false
        this.result = null
        this.results = {
            score: null,
            points: null
        }
    }
}

module.exports = Player