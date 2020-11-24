const router = require('express').Router()
const User = require('../models/user.model')
//const bcrypt = require('bcrypt')

router.get('/liste', async (req, res) => {
    const users = await User.getAllPseudo()
    res.json(users)
    console.log(users)
})

router.get('/id/:pseudo', async (req, res) => {
    console.log('route', req.params.pseudo)
    const id = await User.getIdByPseudo(req.params.pseudo)
    res.json(id)
    console.log(id)
})

router.get('/research/:researchPseudo', async (req, res) => {
    console.log('routeResearch', req.params.routeResearch)
    const user = await User.getPseudoResearch(req.params.routeResearch)
    res.json(user)
    console.log(user)
})

module.exports = router