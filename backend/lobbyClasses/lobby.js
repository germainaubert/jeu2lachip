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
        this.skins = ["http://localhost:3000/static/chipgltf/chip_textured.gltf",
        "http://localhost:3000/static/decorations/chip_textured2.gltf",
        "http://localhost:3000/static/chipgltf/chip_textured_moonskin.gltf",
        "http://localhost:3000/static/chipgltf/nacho_textured.gltf"
    ]
    }

    addUser(user) {
        
        if (user) {
            this.users.push(user)
            this.giveSkin(user)
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
    giveSkin(user){
        user.skin = this.skins[this.users.length-1]
    }
    
}

module.exports = Lobby
