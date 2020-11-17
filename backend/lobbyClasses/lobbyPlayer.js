class lobbyPlayer {
    /** @type {import("../models/user.model.js")[]} */
    id
    pseudo
    x
    y
    size
    speed
    c
    constructor(id, pseudo, x, y, size, speed, c) {
        this.id = id
        this.pseudo = pseudo
        this.x = x
        this.y = y
        this.size = size
        this.speed = speed
        this.c = "#" + ((1 << 24) * Math.random() | 0).toString(16)
    }
}

module.exports = lobbyPlayer