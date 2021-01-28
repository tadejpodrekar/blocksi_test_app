const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Contact = mongoose.model("Contact")
const router = express.Router()
const getContact = require('../middleware/getContact')
const authUser = require('../middleware/authUser')

router.use(authUser)

router.post('/', async (req, res) => {
    const { username, email, first_name, last_name, phone_num } = req.body;

    const contact = new Contact({ username, email, first_name, last_name, phone_num })
    try
    {
        const newContact = await contact.save()
        const newUser = await User.findOneAndUpdate({_id: req.user._id}, {$push: { "contacts": newContact._id }})
        res.status(201).json({
            contact: newContact,
            message: 'Successfully created contact'
        })
    }
    catch(err)
    {
        res.status(400).json({message:err.message})
    }
})

router.get('/', async (req, res) => {
    res.json({msg:"returning all contacts"})
})

router.get('/:id', getContact, (req, res) => {
    res.json({msg:"hello user", user:req.contact.id})
})

router.put('/:id', getContact, async (req, res) => {

})

router.delete('/:id', getContact, async (req, res) => {
    
})

module.exports = router