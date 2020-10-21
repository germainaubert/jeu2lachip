const router = require('express').Router()
const User = require('../models/user.model')

router.post('/user', async (req, res) =>{
    const user = await User.create(req.body)
    res.json(user)
})

module.exports = router