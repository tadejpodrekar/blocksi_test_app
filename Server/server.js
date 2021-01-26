const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Cors = require('cors')
const {MONGODB_URI} = require('./config/keys.js')
const app = express()
const API_PORT = process.env.API_PORT || 5000

//----Database connection
mongoose.connect(MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false
})
mongoose.connection.on('connected',()=>{
    console.log("Connected to database")
})
mongoose.connection.on('error',(err)=>{
    console.log("Error connecting to database. ",err)
})
//----

app.use(Cors())
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.json({
        message:"Home page"
    })
});

app.listen(API_PORT,()=>{
    console.log("Server is running on port", API_PORT)
})