const MALUSLENGTH = 6
const HORSES = 'As'

class Deck {
    /** @type {import("../models/user.model.js")[]} */
    cards
    constructor() {
        this.cards = []
        this.discards = []
        this.malus = []
        this.horses = []
        this.createDeck()
    }
    createDeck() {
        let couleurs = ["coeur", "pique", "trèfle", "carreau"]
        let noms = ["As", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept", "Huit", "Neuf", "Dix", "Valet", "Dame", "Roi"]
        for (let i = 1; i < 14; i++) {
            couleurs.forEach(element => {
                let obj = { color: element, value: i, name: noms[i - 1] }
                this.cards.push(obj)
            });
        }
    }
    setupMalus() {
        for (let i = 0; i < MALUSLENGTH; i++) {
            this.malus.push(this.cards[i])
            this.cards.shift()
        }
    }
    removeCardByName(name) {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].name == name) {
                this.discards.push(this.cards[i])
                this.cards.splice(i, 1)
                i -= 1
            }
        };
    }
    createHorses() {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].name == HORSES) {
                this.horses.push(this.cards[i])
                this.cards.splice(i, 1)
                i -= 1
            }
        };
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
            let draw = this.cards[0]
            this.discards.push(draw)
            this.cards.shift()
            console.log('la carte piochée est : ', draw)
        }
        else {
            let draw = this.cards[0]
            this.discards.push(draw)
            this.cards.shift()
            console.log('la carte piochée est : ', draw)
        }
    }
    shuffleDiscardsInCards() {
        this.discards.forEach(card => {
            this.cards.push(card)
        });
        this.discards = []
        this.shuffle()
        this.removeCardByName(HORSES)
    }
}

module.exports = Deck

