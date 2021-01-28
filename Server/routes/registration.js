const mongoose = require('mongoose')
const User = mongoose.model("User")
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 12)
    const user = new User({ username, password:hashedPass })
    try
    {
        const newUser = await user.save()
        const token = jwt.sign({ user:newUser }, process.env.JWT_SECRET)

        res.status(201).json({
            auth: true,
            accessToken: token,
            message: 'Successfully registered user'
        })
    }
    catch(err)
    {
        res.status(400).json({message:err.message})
    }
})

module.exports = router