class Lobby {
    /** @type {import("../models/user.model.js")[]} */
    id
    users
    sockets
    chat
    is_full
    constructor() {
        this.id = Math.random().toString(36).substr(2, 9)
        this.users = []
        this.chat = []
        this.is_full = false
    }

    addUser(user) {

        if (user) {
            this.users.push(user)
        }
    }

    hasUser(user) {
        let found = this.users.find(elem => elem.id == user.id)
        return found
    }
    hasJoin(user) {
        this.chat.push({ message : user.pseudo + 'est arrivé ! '})
    }
    addMessage(message) {
        if (message) {
            this.chat.push(message)
        }
    }

}

module.exports = Lobby
