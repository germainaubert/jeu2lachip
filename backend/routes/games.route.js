const router = require('express').Router()
const Game = require('../models/game.model')
// const User = require('../models/user.model')
// const Game = require('../models/game.model')

router.get('/liste', async (req, res) => {
    const games = await Game.getAllGameName()
    res.json(games)
    console.log(games)
}),

router.post('/addGames/:ajoutNom/:ajoutLogo', async (req, res) => {
    const game = await Game.create(req.params.ajoutNom, req.params.ajoutLogo)
    res.json({
        ajouter: true
    })
    res.status(200)
}),

router.delete('/deleteGames/:gameName', async (req, res) => {
    const games = await Game.deleteGame(req.params.gameName)
    res.json({
        supprimer: true
    })
    res.status(200)
})

module.exports = router