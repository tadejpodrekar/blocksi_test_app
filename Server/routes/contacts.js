const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Contact = mongoose.model("Contact")
const router = express.Router()
const getContact = require('../middleware/getContact')

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', async (req, res) => {
    res.json({msg:"hello world"})
})

router.get('/:id', getContact, async (req, res) => {
    res.json({msg:"hello user", user:req.contact.id})
})

router.put('/:id', getContact, async (req, res) => {

})

router.delete('/:id', getContact, async (req, res) => {
    
})

module.exports = router