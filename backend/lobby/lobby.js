class Lobby {
    /** @type {import("../models/user.model.js")[]} */
    lobby
    constructor () {
        this.lobby = []
    }
    
    addUser (user) {
        this.lobby.push({user})
        console.log(this.lobby)
    }
}

module.exports = Lobby