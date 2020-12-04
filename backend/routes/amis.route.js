const router = require('express').Router()
// const User = require('../models/user.model')
// const Game = require('../models/game.model')
const Ami = require('../models/amis.model')


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

router.post('/invite/:userId/:amiInvitedId', async (req, res) => {
    console.log('routeCreationAmitie', req.params.userId, req.params.amiInvitedId)
    console.log(req.params.userId)
    console.log(req.params.amiInvitedId)
    const amis = await Ami.create(req.params.userId, req.params.amiInvitedId)
    //console.log()
    res.json({
        amis,
        invite: true
    })
    res.status(200)
})

router.delete('/deleteAmis/:userId/:ami2Id', async (req, res) => {
    console.log('routeDelete', req.params.userId, req.params.ami2Id)
    console.log(req.params.userId)
    console.log(req.params.ami2Id)
    const amis = await Ami.deleteIdAmitie(req.params.userId, req.params.ami2Id)
    //console.log(amis)
    res.json({
        delete: true
    })
    res.status(200)
})



module.exports = router