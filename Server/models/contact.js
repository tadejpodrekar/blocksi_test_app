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
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    phoneNum:{
        type:String
    },
    createdBy:{
        type:String,
        required:true
    }
})

mongoose.model("Contact",contactSchema)