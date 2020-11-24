let Deck = require('./gameClasses/deck.js')
let deck = new Deck()
console.log(deck)
deck.createHorses()
deck.shuffle()
deck.setupMalus()

deck.drawCard()
deck.drawCard()
deck.drawCard()
deck.drawCard()
deck.drawCard()
console.log(deck)
// console.log(deck)
// for (let i = 0; i < 60; i++) {
//     deck.drawCard()
//     console.log(deck.cards.length)
// }
// console.log(deck)