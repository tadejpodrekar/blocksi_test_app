const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    phone_num:{
        type:String
    }
})

mongoose.model("Contact",contactSchema)