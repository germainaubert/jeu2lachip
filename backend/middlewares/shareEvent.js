module.exports = function shareEvent(clients, eventName, datas) {
    clients.forEach((c) => {
        c.emit(eventName, datas)
    })
}