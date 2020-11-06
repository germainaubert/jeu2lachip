const PostgresStore = require('./PostgresStore')
const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const config = require('./server.config')
const cors = require('cors')

PostgresStore.init()
    .then(() => console.log('connected'))

const app = express();

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}))

let mySession = session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false
});

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(mySession)
const authRouter = require('./routes/auth.route')

app.use('/api/auth', authRouter)

module.exports = { app, mySession }