const router = require('express').Router()
const User = require('../models/user.model')
//const bcrypt = require('bcrypt')

router.get('/liste', async (req, res) => {
    const users = await User.getAllPseudo()
    res.json(users)
    console.log(users)
})

module.exports = router