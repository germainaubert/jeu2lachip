const PostgresStore = require('./PostgresStore')
const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const config = require('./server.config')
const socket = require('./socket/lobby.socket.js')
const cors = require('cors')

PostgresStore.init()
.then(() => console.log('connected'))

const app = express();
app.use(cors())

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
const authRouter = require('./routes/auth.route')

app.use('/api/lobby', lobbyRouter)
app.use('/api/auth', authRouter)

module.exports = app;