const router = require('express').Router()
const User = require('../models/user.model')
const Game = require('../models/game.model')
const bcrypt = require('bcrypt')

router.get('/users', async (req, res) => {
    const users = await User.getAll()
    res.json(users)
})

router.get('/getSession', async (req, res) => {
    // console.log('getSession', req.session, Date.now())
    req.session.save()
    res.json(req.session)
})

router.get('/getUser', async (req, res) => {
    // console.log('getSession', req.session, Date.now())
    res.json(req.session)
})

router.get('/nameValidity/:pseudo', async (req, res) => {

    const pseudo = req.params.pseudo
    const user = await User.findByPseudo(pseudo)
    if (!user) {
        res.status(200)
        res.send({
            nameValidity: true
        })
    } else {
        res.send({
            nameValidity: false
        })
        res.status(409)
    }



})

router.post('/login', async (req, res) => {
    const { pseudo, password } = req.body
    console.log(pseudo, password)
    const user = await User.findByPseudo(pseudo)

    if (!user || !(await bcrypt.compare(password, user.password))) {


        res.status(401).json({
            message: 'Did not find any couple matching email and password',
            flag: false
        })


    }
    else {
        user.password = null
        req.session.user = user

        res.status(200).send('connexion réussie')
    }
})

router.post('/register', async (req, res) => {
    const { pseudo, password } = req.body

    const pseudoExists = await User.findByPseudo(pseudo)
    if (pseudoExists) {
        res.json(false)
        res.status(409)
    }

    else {
        const user = await User.create(pseudo, password)
        user.password = null
        req.session.user = user
        req.session.save()
        //console.log(' req session after save : ', req.session)
        res.status(200)
        res.json(
            {
                connect: true,
                id: user.id
            }
        )
        
    }
})

module.exports = router