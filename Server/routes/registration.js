const mongoose = require('mongoose')
const User = mongoose.model("User")
const express = require('express')
const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password })
    try
    {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch(err)
    {
        res.status(400).json({message:err.message})
    }
})

module.exports = router