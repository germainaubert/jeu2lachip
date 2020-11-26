const MALUSLENGTH = 6

const Card = require('./card.js')
class Deck {
    static couleurs = ["coeur", "pique", "trèfle", "carreau"] // Okazou deck de uno
    static noms = ["As", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept", "Huit", "Neuf", "Dix", "Valet", "Dame", "Roi"]
    constructor() {
        //initialisation des propriétés
        this.cards = []
        this.discards = []
        this.malus = []
        //appel des méthodes nécessaires a la création et au mélange du deck
        this.createDeck()
        this.shuffle()
        this.setupMalus()
    }
    createDeck() {
        for (let i = 1; i < Deck.noms.length; i++) {
            Deck.couleurs.forEach(element => {
                this.cards.push(new Card(element, i + 1, Deck.noms[i]))
            });
        }
        
    }
    setupMalus() {
        for (let i = 0; i < MALUSLENGTH; i++) {
            this.malus.push(this.cards[i])
            this.malus[i].revealed = false
            this.malus[i].pos = i+1
            this.cards.shift()
        }
    }
    shuffle() {
        var i, j, tmp;
        for (i = this.cards.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            tmp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = tmp;
        }
    }
    drawCard() {
        if (this.cards.length == 0) {
            this.shuffleDiscardsInCards()
        }
        const draw = this.cards[0]
        this.discards.push(draw)
        this.cards.shift()
        console.log('la carte piochée est : ', draw)
        return draw
    }
    shuffleDiscardsInCards() {
        this.discards.forEach(card => {
            this.cards.push(card)
        });
        this.discards = []
        this.shuffle()
    }
}

module.exports = Deck

