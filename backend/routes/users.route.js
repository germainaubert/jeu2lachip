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
    console.log('routeResearch', req.params.researchPseudo)
    const users = await User.getPseudoResearch(req.params.researchPseudo)
    res.json(users)
    console.log(users)
})

router.delete('/suppression/:deleteUserId', async (req, res) => {
    console.log('routeDeleteUser', req.params.deleteUserId)
    const user = await User.deleteUser(req.params.deleteUserId)
    res.json({
        delete: true
    })
    res.status(200)
}),

router.put('/becomeAdmin/:newAdminId', async (req, res) => {
    console.log('routeNewAdmin', req.params.newAdminId)
    const user = await User.newAdmin(req.params.newAdminId)
    res.json({
        isAdmin: true
    })
    res.status(200)
}),

router.get('/checkAdmin/:pseudo', async (req, res) => {
    console.log('routeCheckAdmin', req.params.pseudo)
    const user = await User.checkAdmin(req.params.pseudo)
    res.json(user)
    console.log(user)
    res.status(200)
})

module.exports = router