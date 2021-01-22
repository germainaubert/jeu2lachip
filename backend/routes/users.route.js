const router = require('express').Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const hasToBeAdmin = require('../middlewares/hasToBeAdmin')
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated')

router.get('/liste', async (req, res) => {
    const users = await User.getAllPseudoAndisAdmin()
    res.json(users)
    console.log(users)
})

router.get('/id/:pseudo', async (req, res) => {
    console.log('route', req.params.pseudo)
    const id = await User.getIdByPseudo(req.params.pseudo)
    res.json(id)
    console.log(id)
})

router.get('/:researchPseudo', async (req, res) => {
    console.log('routeResearch', req.params.researchPseudo)
    console.log("test route")
    const users = await User.getPseudoResearch(req.params.researchPseudo)
    res.json(users)
    console.log(users)
})

router.delete('/suppression/:deleteUserId', hasToBeAdmin, async (req, res) => {
    console.log('routeDeleteUser', req.params.deleteUserId)
    const user = await User.deleteUser(req.params.deleteUserId)
    res.status(200)
    res.json({
        delete: true
    })
})

router.put('/becomeAdmin/:newAdminId', hasToBeAdmin, async (req, res) => {
    console.log('routeNewAdmin', req.params.newAdminId)
    const user = await User.newAdmin(req.params.newAdminId)
    res.status(200)
    res.json({
        isAdmin: true
    })
})

router.put('/changePseudo/:currentUserId/:newPseudo', async (req, res) => {
    console.log('routeChangePseudo', req.params.currentUserId, req.params.newPseudo)
    const user = await User.changePseudo(req.params.currentUserId, req.params.newPseudo)
    res.status(200)
    res.json({
        isChanged: true
    })
})

router.put('/changePassword', async (req, res) => {
    const {currentUserPseudo, password, newpassword1, newpassword2} = req.body
    console.log('routeChangePassword', currentUserPseudo, password, newpassword1, newpassword2)
    const user = await User.findByPseudo(currentUserPseudo)
    console.log(user)
    console.log(password)
    console.log(user.password)
    if (await bcrypt.compare(password, user.password)) {
        if(newpassword1 == newpassword2){
            const pwd = await User.changePassword(currentUserPseudo, newpassword1)
            res.status(200).send('changement réussi')
        }
        else {
            res.status(401).json({
                message: 'Le nouveau mot de passe rentré et sa confirmation ne sont pas les meme',
                flag: false
            })
        }
    }
    else {
        res.status(401).json({
            message: 'Votre mot de passe actuel est erroné',
            flag: false
        })
    }
})

router.get('/checkAdmin/:pseudo', hasToBeAdmin, async (req, res) => {
    console.log('routeCheckAdmin', req.params.pseudo)
    const user = await User.checkAdmin(req.params.pseudo)
    res.json(user)
    console.log(user)
    res.status(200)
})

module.exports = router