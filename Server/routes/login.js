const mongoose = require('mongoose')
const User = mongoose.model("User")
const express = require('express')
const router = express.Router()

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try
    {
        const user = await User.find(u => { return u.username === username && u.password === password });

        if(user)
        {
            const accessToken = jwt.sign({ username: user.username,  role: user.role }, process.env.JWT_SECRET);

            res.status(200).json({accessToken});
        }
        else
        {
            res.send('Username or password incorrect');
        }
    }
    catch(err)
    {
        res.status(400).json({message:err.message})
    }
})

module.exports = router