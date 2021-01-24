function shareEvent(clients, eventName, datas) {
    // console.log("sockets : ",clients," nom event: ", eventName, " données: ", datas)
    clients.forEach((c) => {
        c.emit(eventName, datas)
    })
}

module.exports = shareEvent
