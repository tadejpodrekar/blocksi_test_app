const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Contact = mongoose.model("Contact")
const router = express.Router()
const getContact = require('../middleware/getContact')
const authUser = require('../middleware/authUser')

router.use(authUser)

router.post('/', async (req, res) => {
    const { username, email, first_name, last_name, phone_num } = req.body

    const contact = new Contact({ username, email, first_name, last_name, phone_num })
    try
    {
        const newContact = await contact.save()
        await User.findOneAndUpdate({_id: req.user._id}, {$push: { "contacts": newContact._id }})
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
    const userContacts = await User.findById(req.user._id).populate('contacts')
    console.log(userContacts)
    res.status(200).json({message:"returning all contacts", contacts:userContacts.contacts})
})

router.get('/:id', getContact, async (req, res) => {
    let userContacts = await User.findById(req.user._id)
    if(userContacts.contacts.indexOf(req.params.id) > -1)
    {
        const foundContact = await Contact.findById(req.params.id)
        res.status(200).json({message:"Contact found", contact:foundContact})
    }
    else
    {
        res.status(404).json({message:"Contact not found"})
    }
})

router.put('/:id', getContact, async (req, res) => {
    console.log(req.user.contacts.indexOf(req.params.id))
    let userContacts = await User.findById(req.user._id)
    if(userContacts.contacts.indexOf(req.params.id) > -1)
    {
        const { username, email, first_name, last_name, phone_num } = req.body
        let updateObj = {}
        if(username) {updateObj.username = username}
        if(email) {updateObj.email = email}
        if(first_name) {updateObj.first_name = first_name}
        if(last_name) {updateObj.last_name = last_name}
        if(phone_num) {updateObj.phone_num = phone_num}

        const foundContact = await Contact.updateOne({ _id: req.params.id }, updateObj)
        res.status(200).json({message:"Contact found", contact:foundContact})
    }
    else
    {
        res.status(404).json({message:"Contact not found"})
    }
})

router.delete('/:id', getContact, async (req, res) => {
    console.log(req.user._id)
    let userContacts = await User.findById(req.user._id)
    console.log(userContacts)
    if(userContacts.contacts.indexOf(req.params.id) > -1)
    {
        userContacts.contacts.splice(userContacts.contacts.indexOf(req.params.id), 1)[0]
        await User.updateOne(userContacts)
        await Contact.deleteOne(req.contact)

        res.status(200).json({message:"Contact found and deleted"})
    }
    else
    {
        res.status(404).json({message:"Contact not found"})
    }
})

module.exports = router