const mongoose = require('mongoose')
const Contact = mongoose.model("Contact")

async function getContact(req, res, next) {
    try
    {
        var contact = await Contact.findById(req.params.id)
        if(!contact)
        {
            return res.status(404).json({ message: 'Cant find contact'})
        }
        if(req.user._id == contact.createdBy){
            req.contact = contact
            next()
        } else {
            res.status(403).json({ message:'Cannot access contact created by someone else' })
        }
    }
    catch(err)
    {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = getContact