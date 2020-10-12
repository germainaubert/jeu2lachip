const PostgresStore = require('./PostgresStore')
const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const config = require('./server.config')

PostgresStore.init()
.then(() => console.log('connected'))

const app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false
}))

module.exports = app;