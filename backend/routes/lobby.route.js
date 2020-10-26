const router = require('express').Router()
const User = require('../models/user.model')
const Game = require('../models/game.model')
const Lobby = require('../lobby/lobby.js')
const LobbyContainer = require('../lobby/lobbyContainer.js')

const lobbyContainer = new LobbyContainer()
const lobby = new Lobby()

console.log(lobbyContainer)

router.post('/joinTest', (req, res) => {
    if (req.session.user) {
        lobbyContainer.lobbies.push(lobby.addUser(req.session.user))
        res.json(
        {
            msg: lobbyContainer.lobbies
        })
    } else {
        res.send('Je suis hors ligne').status(500)
    }
    
})

module.exports = router