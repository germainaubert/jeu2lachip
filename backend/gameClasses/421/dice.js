class Dice {
    id
    faces
    value
    constructor(id) {
    this.id = id
    this.faces = 6
    this.value
    }
    
    roll() {
        this.value = Math.floor((Math.random()*this.faces)+1)
    }
}
module.exports = Dice