class Lobby {
    /** @type {import("../models/user.model.js")[]} */
    users
    chat
    constructor () {
        this.users = []
        this.chat = []
    }
    
    addUser (user) {
        this.lobby.push({user})
        console.log(this.lobby)
    }
}

module.exports = Lobby