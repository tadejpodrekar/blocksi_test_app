const mongoose = require('mongoose')
const User = mongoose.model("User")
const express = require('express')
const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const user = new User({ username: username, email: email, password: password })
    user.save(function (err) {
        console.log(err)
        res.json(err)
    })
})

module.exports = router