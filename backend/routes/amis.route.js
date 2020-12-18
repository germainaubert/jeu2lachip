const router = require('express').Router()
// const User = require('../models/user.model')
// const Game = require('../models/game.model')
const Ami = require('../models/amis.model')
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated')


// router.get('/amis', async (req, res) => {
//     const amis = await Ami.getAll()
//     res.json(amis)
// })

// router.post('/amis', async (req, res) => {
//     const ami1 = req.body
//     const ami2 = req.body

//     const ami = await Ami.create(ami1, ami2)

//     res.json(ami)
//     res.status(200)
// })

// router.delete('/amis/:amitieId', async (req, res) => {
//     try {
//         const amitieId = Number(req.params.amitieId)
//         await Ami.delete(amitieId)
//         res.json({ message: 'ok' })
//     } catch (err) {
//         res.status(500)
//         res.send(err.message)
//     }
// })

router.get('/liste/:userId', async (req, res) => {
    console.log('routeListe', req.params.userId)
    const amis = await Ami.getAmi2Pseudo(req.params.userId)
    //console.log(amis)
    res.json(amis)
})

router.post('/:amiInvitedId', async (req, res) => {
    console.log('routeCreationAmitie', req.session.user.id, req.params.amiInvitedId)
    console.log(req.session.user.id)
    console.log(req.params.amiInvitedId)
    const amis = await Ami.create(req.session.user.id, req.params.amiInvitedId)
    //console.log("test")
    res.json({
        amis,
        invite: true
    })
    res.status(200)
})

router.delete('/:ami2Id', async (req, res) => {
    console.log('routeDelete', req.session.user.id, req.params.ami2Id)
    console.log(req.session.user.id)
    console.log(req.params.ami2Id)
    const amis = await Ami.deleteIdAmitie(req.session.user.id, req.params.ami2Id)
    //console.log(amis)
    res.json({
        delete: true
    })
    res.status(200)
})



module.exports = router