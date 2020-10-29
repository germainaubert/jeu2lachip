const router = require('express').Router()
const User = require('../models/user.model')
const Game = require('../models/game.model')
const Ami = require('../models/amis.model')
const bcrypt = require('bcrypt')

router.get('/amis', async (req, res) => {
    const amis = await Ami.getAll()
    res.json(amis)
})

router.post('/amis', async (req, res) => {
    const ami1 = req.body
    const ami2 = req.body

    const ami = await Ami.create(ami1, ami2)

    res.json(ami)
    res.status(200)
})

router.delete('/amis/:amitieId', async (req, res) => {
    try {
        const amitieId = Number(req.params.amitieId)
        await Ami.delete(amitieId)
        res.json({ message: 'ok' })
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

router.get('/amis/liste', async (req, res) => {
    console.log("bonjour")
    const amis = await Ami.getAmi2Pseudo(userId)
    res.json(amis)
})



module.exports = router