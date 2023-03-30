const express = require('express')
require('dotenv').config()
// connecting the database to the app
const dbConn = require('./config/dbConn.config')
dbConn()
const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))



const user = require('./routes/auth.user')
const todo = require('./routes/todo.route')

// importing all auth routes

app.use('/api/v1', user)

// private routes
app.use('/api/v1/', todo)




module.exports = app