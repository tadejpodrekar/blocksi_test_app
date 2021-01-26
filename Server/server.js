require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Cors = require('cors')
const app = express()
const API_PORT = process.env.API_PORT || 5000

//----Database connection
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false
})
const db = mongoose.connection
db.once('open',()=>{
    console.log("Connected to database")
})
db.on('error',(err)=>{
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