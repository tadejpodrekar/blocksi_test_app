const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    contacts:[{
        type: mongoose.ObjectId,
        ref: 'Contact'
    }],
    token:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        required:true,
        default:0
    }
})

userSchema.plugin(uniqueValidator)
mongoose.model("User",userSchema)