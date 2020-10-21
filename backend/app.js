const PostgresStore = require('./PostgresStore')
const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const config = require('./server.config')
const socket = require('./socket/lobby.socket.js')

PostgresStore.init()
.then(() => console.log('connected'))

const app = express();

socket()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false
}))

const lobbyRouter = require('./routes/lobby.route')

app.use('/api/lobby', lobbyRouter)

module.exports = app;