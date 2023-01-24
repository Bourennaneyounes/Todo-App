const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require('body-parser')

const toDoRoutes = require('./routes/ToDoRoute')
const userRoutes = require('./routes/UserRoute')

require('dotenv').config()

const app = express()

const PORT = process.env.port || 5000

app.use(bodyParser());

app.use(cors())



mongoose.connect(process.env.MONGODB_URL).then(()=> console.log('connected to mongodb')).catch((err) => console.log(err))

app.use(toDoRoutes)
app.use(userRoutes)
app.listen(PORT , () => console.log('listening on ' + PORT))