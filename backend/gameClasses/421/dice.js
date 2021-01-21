class Dice {
    id
    faces
    value
    constructor(id) {
    this.id = id
    this.faces = 6
    }
    
    roll() {
        this.value = Math.floor((Math.random()*this.faces)+1)
    }
}
module.exports = Dice