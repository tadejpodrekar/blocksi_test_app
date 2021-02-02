require('dotenv').config()
require('./models/user')
require('./models/contact')
require('./config/database')
const express = require('express')
const bodyParser = require('body-parser')
const Cors = require('cors')
const app = express()

app.use(Cors())
app.use(bodyParser.json())
app.use('/register', require('./routes/registration'))
app.use('/login', require('./routes/login'))
app.use('/contacts', require('./routes/contacts'))

app.listen(process.env.API_PORT,()=>{
    console.log("Server is running on port", process.env.API_PORT)
})