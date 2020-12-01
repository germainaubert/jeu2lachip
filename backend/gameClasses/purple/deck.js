const MALUSLENGTH = 6

const Card = require('./card.js')
class Deck {
    static couleurs = [{color : "coeur", group: "Rouge"},
    {color : "carreau", group: "Rouge"},
    {color : "trèfle", group: "Noir"},
    {color : "pique", group: "Noir"}] // Okazou deck de uno
    static noms = ["As", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept", "Huit", "Neuf", "Dix", "Valet", "Dame", "Roi"]
    constructor() {
        //initialisation des propriétés
        this.cards = []
        this.bomb = []
        this.discards = []
        //appel des méthodes nécessaires a la création et au mélange du deck
        this.createDeck()
        this.shuffle()
    }
    createDeck() {
        for (let i = 0; i < Deck.noms.length; i++) {
            Deck.couleurs.forEach(element => {
                this.cards.push(new Card(element, i + 1, Deck.noms[i]))
            });
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
        this.bomb.push(draw)
        this.cards.shift()
        //console.log('la carte piochée est : ', draw)
        return draw
    }
    
}

module.exports = Deck
