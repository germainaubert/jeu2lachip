class Lobby {
    /** @type {import("../models/user.model.js")[]} */
    users
    chat
    is_full
    constructor() {
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

    addMessage(message) {
        if (message) {
            this.chat.push(message)
        }
    }

}

module.exports = Lobby