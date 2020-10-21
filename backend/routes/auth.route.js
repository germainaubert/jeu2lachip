const router = require('express').Router()
const User = require('../models/user.model')
const Game = require('../models/game.model')
const bcrypt = require('bcrypt')

router.get('/users', async (req, res) => {
    const users = await User.getAll()
    res.json(users)
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
    
    const user = await User.findByPseudo(pseudo)

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401)
        res.send({
            message: 'Did not find any couple matching email and password'
        })
        return
    }

    req.session.userId = user.id
    user.password = null

    res.json(user) // SURTOUT SANS SON MOT DE PASSE !!!!!!
}) 

router.post('/register', async (req, res) => {
    const {pseudo , password} = req.body
    
    const pseudoExists = await User.findByPseudo(pseudo)
    if(pseudoExists) {
        res.send('pseudo existant')
        res.status(409)
    }
    
    else {
        const user = await User.create(pseudo, password)
        res.send('inscription réussie') 
        res.status(200)
    }
    
}) 

module.exports = router