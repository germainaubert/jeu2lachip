const router = require('express').Router()
const User = require('../models/user.model')
const Game = require('../models/game.model')

router.post('/login', async (req, res) => {
    res.send('yo les amis, c\'est lomepal 3')
}) 

module.exports = router