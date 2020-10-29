const socketio = require('socket.io')
const config = require('../server.config')
const Lobby = require('../lobby/lobby')
const lobby = new Lobby()
console.log(lobby)
clients = []
module.exports = function (server, mySession) {
    // io server
    const io = socketio(server)                                                                                                           
    sharedsession = require("express-socket.io-session")
    io.use(sharedsession(mySession))
     
    io.on('connection', function (socket) {
        clients.push(socket)

        socket.on("logged", function(data) {
            if(!lobby.hasUser(data)) {
                lobby.addUser(data)
            }
            
            clients.forEach((c)=>{
                c.emit('loggedEvent',lobby.users)
            })
            
            console.log(lobby.users)
            
        })
    
})
}