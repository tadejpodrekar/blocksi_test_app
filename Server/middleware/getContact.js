const mongoose = require('mongoose')
const Contact = mongoose.model("Contact")

async function getContact(req, res, next) {
    try
    {
        const contact = await Contact.findById(req.params.id)
        if(contact == null)
        {
            return res.status(404).json({ message: 'Cant find user'})
        }
    }
    catch(err)
    {
        return res.status(500).json({ message: err.message })
    }

    res.contact = contact
    next()
}

module.exports = getContact