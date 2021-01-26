const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const contactSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    phone_num:{
        type:String,
        required:true
    }
})

contactSchema.plugin(uniqueValidator)
mongoose.model("Contact",contactSchema)