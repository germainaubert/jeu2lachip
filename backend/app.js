const PostgresStore = require('./PostgresStore')
const express = require('express')
const logger = require('morgan')
const http = require("http")
const session = require('express-session')
const config = require('./server.config')
const ami = require('./models/amis.model')
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
const amiRouter = require('./routes/amis.route')
const userRouter = require('./routes/users.route')

app.use('/api/amis', amiRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

module.exports = {app, mySession}